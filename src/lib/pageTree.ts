import {Page} from "../graphql/types";

export interface NavigationTreeNode {
  title: string;
  path: string;
  sectionTitle: string;
  children?: NavigationTreeNode[];
  expanded?: boolean;
  external?: boolean;
  redirect: any;
}

const buildNavigationTree = (pages: Page[]): NavigationTreeNode[] => {
  const renderInMenu = pages
    .filter((page) => page.pageContext.menu_order)
    .sort((a, b) => {
      return a.path.split('/').length - b.path.split('/').length;
    });

  const rootNodes: NavigationTreeNode[] = [];

  // Map paths to nodes
  const nodeMap: Map<string, NavigationTreeNode> = new Map();

  renderInMenu.forEach(({ path, pageContext }) => {
    const { menu_title, section_title, title, external, redirect } = pageContext;
    const node: NavigationTreeNode = { redirect, external: !!external, sectionTitle: section_title, title: menu_title ?? title, path };
    nodeMap.set(path, node);
  });

  // Build tree
  renderInMenu.forEach(({ path, pageContext }) => {
    const { menu_order } = pageContext;
    const node = nodeMap.get(path);
    const parentPath = `/${path.split('/').filter(Boolean).slice(0, -1).join('/')}/`;
    const parent = nodeMap.get(parentPath);

    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      // @ts-ignore
      parent.children[menu_order - 1] = node;
    } else {
      // @ts-ignore
      rootNodes[menu_order - 1] = node;
    }
  });

  // Recursive function to add children
  const addChildren = (node: NavigationTreeNode) => {
    // @ts-ignore
    const children = nodeMap.get(node.path).children;
    // @ts-ignore
    node.children = children?.filter(Boolean);
    children?.forEach(child => addChildren(child));
  };

  // Add children to root nodes
  rootNodes.forEach(node => addChildren(node));

  // clear from empty elements
  return rootNodes.filter((_, index) => index in rootNodes);
}


export { buildNavigationTree };
