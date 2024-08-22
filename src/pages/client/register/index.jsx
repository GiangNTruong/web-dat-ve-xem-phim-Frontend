import React, { useState } from "react";
import { notification } from "antd";
import { validateEmail } from "../../../util/validateData";
import { STATUS_CODE } from "../../../constants";
import BASE_URL from "../../../api";

const RegisterForm = ({ closeForm, openLoginForm }) => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateData = (name, value) => {
    const errorMessages = {
      fullName: "Họ và tên không được để trống",
      username: "Tên tài khoản không được để trống",
      phone: "Số điện thoại không được để trống",
      email: {
        empty: "Email không được để trống",
        inValid: "Email không đúng định dạng",
      },
      password: "Mật khẩu không được để trống",
      confirmPassword: "Xác nhận mật khẩu không được để trống",
    };

    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessages[name]?.empty || errorMessages[name],
      }));
      return false;
    }

    if (name === "email" && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: errorMessages.email.inValid,
      }));
      return false;
    }

    if (name === "confirmPassword" && value !== user.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Mật khẩu và xác nhận mật khẩu không khớp",
      }));
      return false;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    validateData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = Object.keys(user).every((key) =>
      validateData(key, user[key])
    );

    if (isValid) {
      try {
        const response = await BASE_URL.post("/auth/register", user);
        if (response.status === STATUS_CODE.CREATED) {
          notification.success({
            message: "Thông báo",
            description: "Đăng ký tài khoản thành công",
          });
          openLoginForm();
        }
      } catch (error) {
        const statusCode = error?.response?.status;
        switch (statusCode) {
          case STATUS_CODE.BAD_REQUEST:
            notification.error({
              message: "Cảnh báo",
              description: Object.values(error?.response.data)[0],
            });
            break;
          case STATUS_CODE.ERROR:
            notification.error({
              message: "Cảnh báo",
              description:
                "Đã có lỗi xảy ra. Vui lòng liên hệ với quản trị viên để được trợ giúp.",
            });
            break;
          default:
            notification.error({
              message: "Cảnh báo",
              description: "Lỗi hệ thống.",
            });
            break;
        }
      }
    }
  };

  return (
    <>
      <div
        data-state="open"
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        style={{ pointerEvents: "auto" }}
        data-aria-hidden="true"
        aria-hidden="true"
      />
      <div
        role="dialog"
        id="radix-:r3:"
        aria-describedby="radix-:r5:"
        aria-labelledby="radix-:r4:"
        data-state="open"
        className="bg-black text-white fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-7 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl md:w-full max-w-xl"
        tabIndex={-1}
        style={{ pointerEvents: "auto" }}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2
            id="radix-:r4:"
            className="text-2xl font-bold leading-none tracking-tight"
          >
            Đăng ký
          </h2>
          <p id="radix-:r5:" className="text-sm text-muted-foreground" />
        </div>
        <div className="overflow-auto">
          <div>
            <div className="space-y-4">
              <form className="overflow-y-auto" onSubmit={handleSubmit}>
                <div className="space-y-2 w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="fullName"
                  >
                    Họ và tên
                  </label>
                  <input
                    className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Họ và tên"
                    id="fullName"
                    aria-describedby="fullName-description"
                    aria-invalid="false"
                    value={user.fullName}
                    name="fullName"
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>
                <div className="space-y-2 w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="username"
                  >
                    Tên tài khoản
                  </label>
                  <input
                    className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tên tài khoản"
                    autoComplete="off"
                    id="username"
                    aria-describedby="username-description"
                    aria-invalid="false"
                    value={user.username}
                    name="username"
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                  )}
                </div>
                <div className="space-y-2 w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="phone"
                  >
                    Số điện thoại
                  </label>
                  <input
                    className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Số điện thoại"
                    autoComplete="off"
                    id="phone"
                    aria-describedby="mobile-description"
                    aria-invalid="false"
                    value={user.phone}
                    name="phone"
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
                <div className="space-y-2 w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Email"
                    autoComplete="off"
                    id="email"
                    aria-describedby="email-description"
                    aria-invalid="false"
                    value={user.email}
                    name="email"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2 w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                  >
                    Mật khẩu
                  </label>
                  <input
                    className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Mật khẩu"
                    autoComplete="off"
                    id="password"
                    aria-describedby="password-description"
                    aria-invalid="false"
                    type="password"
                    value={user.password}
                    name="password"
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                <div className="space-y-2 w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="confirmPassword"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <input
                    className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Xác nhận mật khẩu"
                    autoComplete="off"
                    id="confirmPassword"
                    aria-describedby="confirmPassword-description"
                    aria-invalid="false"
                    type="password"
                    value={user.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  type="submit"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          data-state="open"
          aria-label="Close"
          onClick={closeForm}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default RegisterForm;
