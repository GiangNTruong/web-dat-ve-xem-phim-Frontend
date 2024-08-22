import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { changePasswordUser } from "../../services/clientServices/forgetPasswordService";

export default function ChangePasswordForm({ onClose }) {
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Change password form submitted: ", passwords);
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      notification.error({
        message: "Thất bại",
        description: "Mật khẩu không khớp.",
      });
      return;
    }

    try {
      const response = await dispatch(changePasswordUser(passwords)).unwrap();
      console.log("Password change successful: ", response);
      notification.success({
        message: "Thành công",
        description: "Mật khẩu đã được thay đổi.",
      });
      onClose();
    } catch (error) {
      console.error("Failed to change password:", error); // Logging error response
      notification.error({
        message: "Thất bại",
        description: "Đổi mật khẩu thất bại.",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Đổi mật khẩu</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmNewPassword"
            >
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Đổi mật khẩu
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
