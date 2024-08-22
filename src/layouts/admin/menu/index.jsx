import {
  DashboardOutlined,
  PieChartOutlined,
  SpotifyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.scss";

export default function Menu() {
  return (
    <>
      <menu className="ra-admin-menu">
        <Link to="/admin" className="logo">
          <img className="image" src="/logo.png" alt="" />
        </Link>
        <div className="navlinks">
          <NavLink end className="link" to="/admin">
            <DashboardOutlined />
            <span>Tổng quan</span>
          </NavLink>
          <NavLink className="link" to="/admin/user-management">
            <UserOutlined />
            <span>QUản lý user</span>
          </NavLink>

          <NavLink className="link" to="/admin/voucher-management">
            <SpotifyOutlined />
            <span>Giảm giá</span>
          </NavLink>
          <NavLink className="link" to="/admin/news-management">
            <PieChartOutlined />
            <span>Tin tức</span>
          </NavLink>
          <NavLink className="link" to="/admin/ticket-price-management">
            <SpotifyOutlined />
            <span>Giá vé</span>
          </NavLink>
        </div>
      </menu>
    </>
  );
}
