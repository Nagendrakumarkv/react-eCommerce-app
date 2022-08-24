import React from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are You Sure To Sign Out?")) {
      logOut(dispatch);
      navigate("/");
    }
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">nagaadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer">
            <Logout onClick={handleLogout} />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
