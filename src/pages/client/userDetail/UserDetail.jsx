import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import Header from "../../../layouts/client/header";
import Footer from "../../../layouts/client/footer";
import { updateUserDetails } from "../../../services/clientServices/userDetailServices";
import Cookies from "js-cookie";
import ChangePasswordForm from "../../../components/clientComponents/changePassword/ChangePasswordForm";

export default function UserDetail() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
  });
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);

  useEffect(() => {
    const user = Cookies.get("userInfo")
      ? JSON.parse(Cookies.get("userInfo"))
      : null;
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phone: user.phone || "",
        address: user.address || "",
        email: user.email || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      notification.error({
        message: "Thông tin không đầy đủ",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
      });
      return;
    }

    const updateData = {
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
    };

    dispatch(updateUserDetails({ formData: updateData }))
      .then((result) => {
        if (result.payload) {
          const updatedUser = {
            ...JSON.parse(Cookies.get("userInfo")),
            ...result.payload,
          };
          Cookies.set("userInfo", JSON.stringify(updatedUser), { expires: 1 });

          notification.success({
            message: "Thành công",
            description: "Thông tin cá nhân đã được cập nhật.",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to update user details:", error);
        notification.error({
          message: "Thất bại",
          description: "Cập nhật thông tin cá nhân thất bại.",
        });
      });
  };

  return (
    <>
      <Header />
      <div className="text-white bg-black pt-20 xl:pt-28 pb-10 xl:pb-20 px-4 xl:px-0">
        <div className="bg-black mx-auto max-w-7xl">
          <h3 className="text-2xl font-bold mb-10 text-center">
            Thông tin cá nhân
          </h3>
          <div className="mt-10">
            <div className="max-w-4xl mx-auto">
              <form
                className="md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2 w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="fullName"
                  >
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tên"
                    id="fullName"
                    aria-describedby="fullName-description"
                    aria-invalid="false"
                    value={formData.fullName}
                    onChange={handleChange}
                    name="fullName"
                  />
                </div>
                <div className="space-y-2 w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="phone"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Số điện thoại"
                    id="phone"
                    aria-describedby="phone-description"
                    aria-invalid="false"
                    value={formData.phone}
                    onChange={handleChange}
                    name="phone"
                  />
                </div>
                <div className="space-y-2 w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="address"
                  >
                    Địa chỉ
                  </label>
                  <input
                    className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Địa chỉ"
                    id="address"
                    aria-describedby="address-description"
                    aria-invalid="false"
                    value={formData.address}
                    onChange={handleChange}
                    name="address"
                  />
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
                    disabled
                    placeholder="Email"
                    id="email"
                    aria-describedby="email-description"
                    aria-invalid="false"
                    value={formData.email}
                    name="email"
                  />
                </div>
                <div className="col-span-2 flex justify-end pt-4 gap-4">
                  <button
                    className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-blue-500 hover:text-accent-foreground h-9 rounded-md px-3"
                    type="button"
                    onClick={() => setChangePasswordOpen(true)}
                  >
                    Đổi mật khẩu
                  </button>
                  <button
                    className="bg-red-500 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-danger text-destructive-foregrou border border-input hover:bg-blue-500 h-9 rounded-md px-3"
                    type="submit"
                  >
                    Lưu thông tin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isChangePasswordOpen && (
        <ChangePasswordForm onClose={() => setChangePasswordOpen(false)} />
      )}
      <Footer />
    </>
  );
}
