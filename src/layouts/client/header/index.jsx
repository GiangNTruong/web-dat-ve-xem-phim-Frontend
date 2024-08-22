import React, { useEffect, useState } from "react";
import { MenuOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";
import RegisterForm from "../../../pages/client/register";
import LoginForm from "../../../pages/client/login";
import ForgotPasswordForm from "../../../pages/client/forgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Space, Menu, Divider, theme } from "antd";
import Cookies from "js-cookie";
import { logout } from "../../../redux/slices/clientSlices/authSlice";
import { loadUserFromCookie } from "../../../services/clientServices/authService";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

  const [userData, setUserData] = useState(() => {
    return JSON.parse(Cookies.get("userInfo") || null);
  });

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(loadUserFromCookie(token));
    }
    const user = JSON.parse(Cookies.get("userInfo") || null);
    setUserData(user);
  }, [showLoginForm]);

  useEffect(() => {
    if (auth?.data) {
      setUserData(auth?.data);
    }
  }, [auth]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const openLoginForm = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setShowForgotPasswordForm(false);
  };

  const openRegisterForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
    setShowForgotPasswordForm(false);
  };

  const openForgotPasswordForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowForgotPasswordForm(true);
  };

  const closeForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowForgotPasswordForm(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
    Cookies.remove("userInfo");
    setUserData(null);
    closeForm();
    navigate("/");
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <NavLink className="link" to="/user/user-detail">
          Thông tin cá nhân
        </NavLink>
      ),
    },
  ];

  const { useToken } = theme;
  const { token } = useToken();

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle = {
    boxShadow: "none",
  };

  const menu = <Menu items={menuItems} />;

  const dropdownRender = (menu) => (
    <div style={contentStyle}>
      {React.cloneElement(menu, { style: menuStyle })}
      <Divider style={{ margin: 0 }} />
      <Space style={{ padding: 8 }}>
        <Button type="primary" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Space>
    </div>
  );

  return (
    <header className="header px-4 h-20 flex flex-row justify-between">
      <div className="header-logo">
        <img
          src="https://cdnphoto.dantri.com.vn/COm1qksauO2sqAC-gVVI2DdH_1I=/thumb_w/1020/2023/01/24/khoa-hocdocx-1674520013659.png"
          alt="Logo"
        />
      </div>
      <div className="header-menu-icon" onClick={toggleMenu}>
        <MenuOutlined />
      </div>
      <nav className={`header-nav ${menuVisible ? "visible" : ""}`}>
        <a href="#" className="nav-item">
          Trang chủ
        </a>
        <a href="#" className="nav-item">
          Lịch chiếu
        </a>
        <NavLink to="/news" className="nav-item">
          Tin tức
        </NavLink>
        <NavLink to="/list-voucher" className="nav-item">
          Khuyến mãi
        </NavLink>
        <a href="#" className="nav-item">
          Giá vé
        </a>
        <a href="#" className="nav-item">
          Phim hot trong tháng
        </a>
        <a href="#" className="nav-item">
          Giới thiệu
        </a>
      </nav>
      <div className="header-actions">
        {Cookies.get("token") && userData ? (
          <Dropdown menu={{ items: menuItems }} dropdownRender={dropdownRender}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className="text-white">
                <UserOutlined className="text-white" />
                {userData.username}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <>
            <button className="register" onClick={openRegisterForm}>
              Đăng ký
            </button>
            <button className="login" onClick={openLoginForm}>
              Đăng nhập
            </button>
          </>
        )}
      </div>
      {showLoginForm && (
        <LoginForm
          closeForm={closeForm}
          openRegisterForm={openRegisterForm}
          openForgotPasswordForm={openForgotPasswordForm}
        />
      )}
      {showRegisterForm && (
        <RegisterForm closeForm={closeForm} openLoginForm={openLoginForm} />
      )}
      {showForgotPasswordForm && <ForgotPasswordForm closeForm={closeForm} />}
    </header>
  );
}
