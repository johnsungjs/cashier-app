import React, { useState } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import ClickOutside from "./ClickOutside";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useNavigate } from "react-router-dom";

const Sidenav = ({ childToParent }) => {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <ClickOutside
        onClickOutside={() => {
          // childToParent(expand)
          // setExpand(false);
        }}>
        <SideNav
          className='sidenav'
          onSelect={(selected) => {
            console.log("selected", selected);
            navigate(selected);
          }}
          expanded={expand}
          onToggle={() => {
            childToParent(!expand);
            setExpand(!expand);
          }}>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected='home'>
            <NavItem eventKey='home'>
              <NavIcon>
                <i
                  className='fa fa-fw fa-home'
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey='history'>
              <NavIcon>
                <i className='fa fa-history' style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>History Transaction</NavText>
            </NavItem>
            <NavItem eventKey='settings'>
              <NavIcon>
                <i className='fa fa-cog' style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Settings</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </ClickOutside>
    </div>
  );
};

export default Sidenav;
