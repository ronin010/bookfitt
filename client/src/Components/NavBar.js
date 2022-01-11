import { Drawer } from "antd";
import React, {useState} from "react";
import {MenuOutlined} from "@ant-design/icons"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Actions/AuthActions";

export default function NavBar(props) {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const accountType = useSelector(state => state.auth.accountType);

  const drawerHandler = (value) => {
    setOpen(value);
  }

  return (
    <div className="nav-menu">
      <MenuOutlined onClick={() => drawerHandler(true)} className="menu-button" />
      <h1 className="menu-header">
        {props.header}
      </h1>
      <Drawer
        title="BookFitt"
        placement="left"
        closable={false}
        onClose={() => drawerHandler(false)}
        visible={open}
      >
        <div className="menu-items">
          {
            !isAuth ?
              <div>
                <h3 onClick={() => history.push("/")} className="menu-item">
                  Home
                </h3>
                <h3 onClick={() => history.push("/register")} className="menu-item">
                  Register
                </h3>
                <h3 onClick={() => history.push("/login")} className="menu-item">
                  Login
                </h3>
                <h3 onClick={() => window.open("https://github.com/ronin010/", "_blank")} className="menu-item">
                  Github
                </h3>
              </div> :

              <div>
                <h3 className="menu-item" onClick={() => history.push("/dashboard/" + accountType)}>
                  Home
                </h3>
                <h3 className="menu-item" onClick={() => history.push("/sessions")}>
                  My Sessions
                </h3>
                <h3 onClick={() => dispatch(logout())} className="menu-item">
                  Logout
                </h3>
                <h3 className="menu-item">
                  Github
                </h3>
              </div>
          }
        </div>
      </Drawer>
    </div>
  )
}