import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOtp,
  verifyOtp,
  changePassword,
} from "../../../services/clientServices/forgetPasswordService";
import { notification } from "antd";
import "./index.scss";

const ForgotPasswordForm = ({ closeForm }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(
    (state) => state.forgetPassword
  );

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(sendOtp(email));
    console.log(resultAction);
    if (sendOtp.fulfilled.match(resultAction)) {
      setStep(2);
    } else {
      notification.error({
        message: "Email không xác thực",
        description:
          resultAction.payload || "Email không tồn tại trong hệ thống.",
      });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(verifyOtp({ otp, email }));
    if (verifyOtp.fulfilled.match(resultAction)) {
      setStep(3);
    } else {
      notification.error({
        message: "Xác thực OTP không thành công",
        description:
          resultAction.payload || "OTP không chính xác. Vui lòng thử lại.",
      });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      notification.error({
        message: "Mật khẩu không khớp",
        description: "Mật khẩu mới và xác nhận mật khẩu không khớp.",
      });
      return;
    }
    const resultAction = await dispatch(changePassword({ passwords, email }));
    if (changePassword.fulfilled.match(resultAction)) {
      notification.success({
        message: "Đổi mật khẩu thành công",
        description: "Mật khẩu của bạn đã được thay đổi thành công.",
      });
      closeForm();
    } else {
      notification.error({
        message: "Đổi mật khẩu không thành công",
        description: resultAction.payload || "Có lỗi xảy ra. Vui lòng thử lại.",
      });
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <button className="close-button" onClick={closeForm}>
          X
        </button>
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="forgot-password-form">
            <h2>Quên mật khẩu</h2>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading === "pending"}>
              Gửi mã OTP
            </button>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="verify-otp-form">
            <h2>Xác thực OTP</h2>
            <div className="form-group">
              <label>OTP</label>
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading === "pending"}>
              Xác nhận OTP
            </button>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
          </form>
        )}
        {step === 3 && (
          <form
            onSubmit={handleChangePassword}
            className="change-password-form"
          >
            <h2>Đổi mật khẩu</h2>
            <div className="form-group">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={passwords.confirmNewPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmNewPassword: e.target.value,
                  })
                }
                required
              />
            </div>
            <button type="submit" disabled={loading === "pending"}>
              Đổi mật khẩu
            </button>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
