import React, { useState } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import Cookies from "js-cookie";
import { logout } from "../../../redux/slices/clientSlices/authSlice";
import "./index.scss";
import { useNavigate } from "react-router-dom";

export default function HeaderAdmin() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() =>
    JSON.parse(Cookies.get("userInfo") || null)
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
    Cookies.remove("userInfo");
    setUserData(null);
    navigate("/");
  };

  return (
    <header className="ra-admin-header">
      <div className="left">
        <UnorderedListOutlined />
      </div>
      <div className="right">
        {userData ? (
          <>
            <span className="text-black">
              Tên đăng nhập: {userData.fullName}
            </span>
            <Button onClick={handleLogout} type="primary">
              Đăng xuất
            </Button>
          </>
        ) : (
          <span className="text-black">Admin</span>
        )}
      </div>
    </header>
  );
}
