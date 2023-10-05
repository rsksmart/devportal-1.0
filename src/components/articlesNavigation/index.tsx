import {graphql, Link, useStaticQuery} from "gatsby";
import React, {useMemo} from "react";
import {buildNavigationTree, NavigationTreeNode} from "../../lib/pageTree";

interface Sibling {
  title: string;
  path: string;
}

interface ArticleNavigationTreeNode extends NavigationTreeNode {
  prev?: Sibling;
  next?: Sibling;
}

const getFlattenTree = (nodes: NavigationTreeNode[]) => {
  const result: NavigationTreeNode[] = [];

  nodes.forEach((node) => {
    const {children, ...restNode} = node;

    if (children && Array.isArray(children)) {
      result.push(restNode);
      result.push(...getFlattenTree(children));
    } else {
      result.push(node);
    }
  })

  return result;
}

const getCurrentNodeWithSibling = (tree: NavigationTreeNode[], path: string): ArticleNavigationTreeNode | null => {
  for (let i = 0; i < tree.length; i++) {
    const elem = tree[i];

    if (elem.path === path) {
      return {...elem, prev: tree[i - 1], next: tree[i + 1]}
    }
  }
  return null;
}

interface Props {
  path: string;
}

const ArticlesNavigation = ({ path }: Props) => {
  const {
    pages: {nodes},
  } = useStaticQuery(graphql`
    {
      pages: allSitePage {
        nodes {
          path
          pageContext
        }
      }
    }
  `);

  const currentNode = useMemo(() => {
    const tree = buildNavigationTree(nodes);
    const flattenTree = getFlattenTree(tree);
    return getCurrentNodeWithSibling(flattenTree, path);
  }, [nodes, path]);

  return (
    <nav className="sibling-articles-nav">
      {currentNode?.prev?.path && <Link className="sibling-articles-nav__prev" to={currentNode.prev.path}>&#60;&#60; {currentNode.prev.title}</Link>}
      {currentNode?.next?.path && <Link className="sibling-articles-nav__next" to={currentNode.next.path}>{currentNode.next.title} &#62;&#62;</Link>}
    </nav>
  );
}

export default ArticlesNavigation;
