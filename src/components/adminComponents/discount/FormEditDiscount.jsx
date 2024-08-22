import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateDiscount,
  fetchAllDiscounts,
} from "../../../services/adminServices/discountServices";
import { formatDate } from "../../../util/formatDate";

export default function FormEditDiscount({ discount, onSuccess, onClose }) {
  const [formValues, setFormValues] = useState({
    code: "",
    description: "",
    discountPercentage: 0,
    isUsed: false,
    validFrom: "",
    validTo: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (discount) {
      setFormValues({
        ...discount,
        validFrom: formatDate(discount.validFrom),
        validTo: formatDate(discount.validTo),
      });
    }
  }, [discount]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateDiscount({ id: discount.id, discountData: formValues })
    ).then(() => {
      onSuccess();
      onClose();
      dispatch(fetchAllDiscounts({ page: 0 }));
    });
  };

  return (
    <>
      <div
        data-state="open"
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        style={{ pointerEvents: "auto" }}
        data-aria-hidden="true"
        aria-hidden="true"
      />
      <div
        role="dialog"
        className="bg-black text-white fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-7 shadow-lg rounded-2xl md:w-full max-w-xl"
        tabIndex={-1}
        style={{ pointerEvents: "auto" }}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-2xl font-bold leading-none tracking-tight">
            Chỉnh sửa Discount
          </h2>
        </div>
        <div className="overflow-auto">
          <form className="overflow-y-auto" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="code"
                >
                  Mã Code
                </label>
                <input
                  className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base"
                  placeholder="Nhập mã code"
                  id="code"
                  aria-describedby="code-description"
                  aria-invalid="false"
                  value={formValues.code}
                  name="code"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="description"
                >
                  Miêu tả
                </label>
                <input
                  className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base"
                  placeholder="Nhập miêu tả"
                  autoComplete="off"
                  id="description"
                  aria-describedby="description-description"
                  aria-invalid="false"
                  value={formValues.description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="discountPercentage"
                >
                  Chiết khấu
                </label>
                <input
                  className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base"
                  placeholder="Nhập chiết khấu"
                  autoComplete="off"
                  id="discountPercentage"
                  aria-describedby="discountPercentage-description"
                  aria-invalid="false"
                  type="number"
                  value={formValues.discountPercentage}
                  name="discountPercentage"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="validFrom"
                >
                  Ngày bắt đầu
                </label>
                <input
                  className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base"
                  id="validFrom"
                  aria-describedby="validFrom-description"
                  aria-invalid="false"
                  type="date"
                  value={formValues.validFrom}
                  name="validFrom"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="validTo"
                >
                  Ngày kết thúc
                </label>
                <input
                  className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base"
                  id="validTo"
                  aria-describedby="validTo-description"
                  aria-invalid="false"
                  type="date"
                  value={formValues.validTo}
                  name="validTo"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="isUsed"
                >
                  Đã sử dụng
                </label>
                <input
                  className="ml-2"
                  id="isUsed"
                  aria-describedby="isUsed-description"
                  aria-invalid="false"
                  type="checkbox"
                  checked={formValues.isUsed}
                  name="isUsed"
                  onChange={handleChange}
                />
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                type="submit"
              >
                Chỉnh sửa
              </button>
            </div>
          </form>
        </div>
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close"
          onClick={onClose}
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
}
