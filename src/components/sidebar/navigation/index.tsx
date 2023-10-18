import {graphql, useStaticQuery} from "gatsby";
import React from "react";
import {buildNavigationTree, NavigationTreeNode} from "../../../lib/pageTree";
import NavList from "./List";

interface Props {
  pathname: string;
}

const Navigation = ({ pathname }: Props) => {
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

  const setActiveItems = (pageTree: NavigationTreeNode[]): NavigationTreeNode[] => {
    if (!pathname || pathname === '/') return pageTree;

    return pageTree.map(i => {
      const _i = {...i};
      if (pathname.includes(_i.path)) {
        _i.expanded = true;

        if (_i.children) {
          _i.children = setActiveItems(_i.children);
        }
      }
      return _i;
    });
  }

  let tree = setActiveItems(buildNavigationTree(nodes));

  return (
    <nav className="sidebar-nav">
      <NavList pathname={pathname} navigationTree={tree}/>
    </nav>
  );
}

export default Navigation;
