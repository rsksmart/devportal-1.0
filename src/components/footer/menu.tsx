import React from "react";
import {Link} from "gatsby";
import {NavLink} from "../header/menu";
import classnames from 'classnames';

interface Props {
  items: NavLink[]
}

export const FooterMenu = ({items}: Props) => {
  const renderMenuItems = () => {
    return items.map((item, index) => {
      if (!item.link) {
        return (
          <li key={item.label} className="mb-3">
            <span className="footer-menu-subtitle">{item.label}</span>
          </li>
        )
      } else {
        if (item.external) {
          return (
            <li key={item.label} className={classnames('mb-3')}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.link}
                className={classnames({
                  'btn btn-outline-white': item.isButton
                })}
              >{item.label}</a>
            </li>
          )
        } else {
          return (
            <li key={item.label} className="mb-3">
              <Link
                to={item.link}
                className={classnames({
                  'btn btn-outline-white': item.isButton
                })}
              >{item.label}</Link>
            </li>
          )
        }
      }
    })
  }

  return (
    <nav className="footer-menu fs-7 mb-6 mb-lg-0">
      <ul className="list-unstyled mb-6">
        {renderMenuItems()}
      </ul>
    </nav>
  )
}
