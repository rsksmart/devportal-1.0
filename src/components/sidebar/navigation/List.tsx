import {Link} from "gatsby";
import React, {PropsWithChildren, useContext, useState} from "react";
import {NavigationTreeNode} from "../../../lib/pageTree";
import classnames from "classnames";
import {SidebarContext} from "../index";

interface Props {
  navigationTree: NavigationTreeNode[],
  className?: string
  pathname: string;
}

const NavList = ({navigationTree, children, className, pathname}: PropsWithChildren<Props>) => {
  const [tree, setTree] = useState(navigationTree);

  const {expanded} = useContext(SidebarContext);

  const toggleExpandTree = (tree: NavigationTreeNode[], item: NavigationTreeNode, setTree: (items: NavigationTreeNode[]) => void) => {
    const index = tree.findIndex(i => i.path === item.path);
    let _item = { ...item };
    _item.expanded = !item.expanded;
    const _tree = [...tree];
    _tree[index] = _item;
    setTree(_tree);
  }

  return (
    <ul className={classnames('sidebar-nav__list', className)}>
      {tree.map((item, index) => {
        return (
          <React.Fragment key={item.path}>
            {index === 0 && children}
            <li className="sidebar-nav__item">
              {!item.children && (
                <Link className="sidebar-nav__link" activeClassName="sidebar-nav__link--active" to={item.path}>{item.title}</Link>
              )}
              {item.children && (
                <>
                  <button
                    className={classnames('sidebar-nav__button d-flex w-100 justify-content-between', {
                      'sidebar-nav__button--active': pathname && pathname.includes(item.path)
                    })}
                    onClick={() => toggleExpandTree(tree, item, setTree)}
                  >
                    <span>{item.sectionTitle || item.title}</span>
                    <span>{item.expanded || expanded ? '-' : '+'}</span>
                  </button>
                  <NavList pathname={pathname} navigationTree={item.children} className={classnames({
                    'd-block': item.expanded || expanded,
                    'd-none': !item.expanded && !expanded
                  })}>
                    {!item.redirect && <li className="sidebar-nav__item">
                      <Link
                        className="sidebar-nav__link"
                        activeClassName="sidebar-nav__link--active"
                        to={item.path}
                      >{item.title}</Link>
                    </li>}
                  </NavList>
                </>
              )}
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
}

export default NavList;
