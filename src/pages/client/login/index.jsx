import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../services/clientServices/authService";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ closeForm, openRegisterForm, openForgotPasswordForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateData = (name, value) => {
    const errorMessages = {
      email: {
        empty: "Email không được để trống",
      },
      password: "Mật khẩu không được để trống",
    };

    const setErrorFunctions = {
      email: setEmailError,
      password: setPasswordError,
    };

    const setErrorFunction = setErrorFunctions[name];

    if (!value) {
      setErrorFunction(errorMessages[name].empty || errorMessages[name]);
      return false;
    }

    setErrorFunction("");
    return true;
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    validateData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        login({
          email: user.email,
          password: user.password,
        })
      ).unwrap();

      const roles = response?.roles;
      if (roles && roles.some((role) => role === "ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      notification.success({
        message: "Thành công",
        description: "Đăng nhập thành công",
      });
      closeForm();
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Thất bại",
        description: "Đăng nhập thất bại.",
      });
    }
  };

  return (
    <>
      <div
        data-state="open"
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        data-aria-hidden="true"
        aria-hidden="true"
        style={{ pointerEvents: "auto" }}
      />
      <div
        role="dialog"
        id="radix-:r0:"
        aria-describedby="radix-:r2:"
        aria-labelledby="radix-:r1:"
        data-state="open"
        className=" bg-black text-white fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-7 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl md:w-full"
        tabIndex={-1}
        style={{ pointerEvents: "auto" }}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2
            id="radix-:r1:"
            className="text-2xl font-bold leading-none tracking-tight"
          >
            Đăng nhập
          </h2>
          <p id="radix-:r2:" className="text-sm text-muted-foreground" />
        </div>
        <div className="overflow-auto">
          <div>
            <div className="space-y-4">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor=":rm:-form-item"
                  >
                    Email
                  </label>
                  <input
                    className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Email"
                    autoComplete="off"
                    id=":rm:-form-item"
                    aria-describedby=":rm:-form-item-description"
                    aria-invalid="false"
                    defaultValue=""
                    name="email"
                    onChange={handleChange}
                  />
                  {emailError && <p className="text-red-500">{emailError}</p>}
                </div>
                <div className="mt-5">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor=":rn:-form-item"
                    >
                      Mật khẩu
                    </label>
                    <input
                      className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Mật khẩu"
                      autoComplete="off"
                      id=":rn:-form-item"
                      aria-describedby=":rn:-form-item-description"
                      aria-invalid="false"
                      type="password"
                      defaultValue=""
                      name="password"
                      onChange={handleChange}
                    />
                    {passwordError && (
                      <p className="text-red-500">{passwordError}</p>
                    )}
                  </div>
                </div>
                <p
                  className="text-red-500 text-end mt-3 text-sm cursor-pointer hover:underline"
                  onClick={openForgotPasswordForm}
                >
                  Quên mật khẩu?
                </p>
                <div className="mt-8 w-full">
                  <button
                    style={{
                      background:
                        "linear-gradient(90deg, #ff0000 0%, #ff5657 100%)",
                    }}
                    className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-danger text-destructive-foreground hover:bg-blue-500 h-10 px-8 py-2 w-full"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                </div>
                <p className="mt-8 text-center text-sm">
                  Bạn chưa có tài khoản?{" "}
                  <a
                    className="text-red-500 hover:underline cursor-pointer"
                    onClick={openRegisterForm}
                  >
                    Đăng ký
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={closeForm}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
};

export default LoginForm;
