
import React, {createContext, useState} from "react";
import Navigation from "./navigation";
import classnames from "classnames";
import {Link} from "gatsby";
import { MendableSearchBar } from '@mendable/search';

interface Props {
  className?: string;
  pathname: string;
}

interface SidebarContextObject {
  expanded: boolean;
  setExpanded: (value: boolean) => void
}

export const SidebarContext = createContext<SidebarContextObject>({
  expanded: false,
  setExpanded: (value: boolean) => {}
});

const Sidebar = ({ className, pathname }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const mendableSearchBarStyle = { darkMode: true, accentColor: "#123456" }
  const mendableApiKey = process.env.GATSBY_MENDABLE_API_KEY!!

  return (
    <SidebarContext.Provider value={{
      expanded,
      setExpanded
    }}>
      <div className={classnames(className, 'sidebar')}>
        <div className="sidebar__wrapper">
          <MendableSearchBar anon_key={mendableApiKey} style={mendableSearchBarStyle} language="en" askAIText="Ask Rootstock AI" showSimpleSearch/>
          <div className="pr-4">
            <div className="my-2">
              <Link className="sidebar__link" to="/">Rootstock Documentation</Link>
            </div>
            <div className="my-2 mb-5">
              <button
                className="sidebar__collapse d-flex w-100 justify-content-between"
                onClick={() => setExpanded(!expanded)}
              >
                <span>{expanded ? 'Collapse All' : 'Expand All'}</span>
                <span>{expanded ? '-' : '+'}</span>
              </button>
            </div>
            <Navigation pathname={pathname} />
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

export default Sidebar;
