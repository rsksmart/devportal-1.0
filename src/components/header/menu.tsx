import {Link} from "gatsby";
import React from "react";
import {NavDropdown} from "react-bootstrap";

export interface NavLink {
  label: string;
  link?: string;
  external?: boolean;
  children?: NavLink[];
  isButton?: boolean;
  subItem?: boolean;
}

const links: NavLink[] = [
  {
    label: 'Platforms',
    children: [
      {
        label: 'Rootstock Blockchain',
        link: 'https://rootstock.io/',
        external: true
      },
      {
        label: 'RIF - Rootstock (RSK) Infrastructure Framework',
        link: 'https://www.rifos.org/',
        external: true
      }
    ]
  },
  {
    label: 'Build',
    children: [
      {
        label: 'The Stack',
        link: '/the-stack/'
      },
      {
        label: 'Dev Portal',
        link: '/',
      },
      {
        label: 'Explorer',
        link: 'https://explorer.rsk.co/',
        external: true
      },
      {
        label: 'Stats',
        link: 'https://stats.rsk.co/',
        external: true
      },
      {
        label: 'Gas Station',
        link: 'http://rskgasstation.info/',
        external: true
      }
    ]
  },
  {
    label: 'Learn',
    children: [
      {
        label: 'Courses',
        link: '/courses/'
      }
    ]
  },
  {
    label: 'Use',
    children: [
      {
        label: 'Build On Rootstock',
        link: 'https://rootstock.io/build-defi-on-bitocoin',
        external: true
      },
      {
        label: 'Wallets',
        link: '/wallet/'
      },
      {
        label: 'RIF Name Service',
        link: 'https://rif.technology/solutions/#rns',
        external: true
      },
      {
        label: 'Buy RBTC/RIF Tokens',
        link: '/rsk/rbtc/#exchanges'
      },
    ]
  },
  {
    label: 'Community',
    children: [
      {
        label: 'Discord',
        link: 'https://rootstock.io/discord',
        external: true
      },
      {
        label: 'GitHub',
        link: 'https://github.com/rsksmart',
        external: true
      },
      {
        label: 'Forum',
        link: 'https://research.rsk.dev/',
        external: true
      },
      {
        label: 'Bounty Program',
        link: 'https://www.iovlabs.org/bug-bounty-program',
        external: true
      },
      {
        label: 'Medium',
        link: 'https://medium.com/iovlabs-innovation-stories',
        external: true
      },
    ]
  },
  {
    label: 'Blog',
    link: 'https://blog.rsk.co/',
    external: true
  }
];

const Menu = () => {
  return (
    <ul className="navbar-nav w-100 me-lg-auto d-flex justify-content-end mb-2 mb-lg-0">
      {links.map(navLink => {
        if (navLink.children) {
          return (
            <li className="nav-item" key={navLink.label}>
              <NavDropdown title={navLink.label} id="basic-nav-dropdown" menuVariant="dark" renderMenuOnMount={true}>
                {navLink.children?.map(subNavLink => {
                  if (subNavLink.external) {
                    return (<a key={subNavLink.label} className="nav-link" href={subNavLink.link} target="_blank"
                               rel="noopener noreferrer">{subNavLink.label}</a>);
                  } else {
                    return (<Link key={subNavLink.label} className="nav-link" to={subNavLink.link || '/'}>{subNavLink.label}</Link>);
                  }
                })}
              </NavDropdown>
            </li>
          );
        } else {
          if (navLink.external) {
            return (<a key={navLink.label} className="nav-link" href={navLink.link} target="_blank"
                       rel="noopener noreferrer">{navLink.label}</a>);
          } else {
            return (<Link key={navLink.label} className="nav-link" to={navLink.link || '/'}>{navLink.label}</Link>);
          }
        }
      })}
    </ul>
  );
}

export default Menu;
