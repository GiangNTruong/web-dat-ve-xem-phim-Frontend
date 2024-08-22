import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateTicketPrice,
  fetchAllTicketPrices,
} from "../../../services/adminServices/ticketServices";

export default function FormEditTicket({ ticketPrice, onSuccess, onClose }) {
  const [formValues, setFormValues] = useState({
    standardPrice: "",
    sweetboxPrice: "",
    vipPrice: "",
    timePeriod: "",
    weekendRate: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (ticketPrice) {
      setFormValues({
        standardPrice: ticketPrice.standardPrice,
        sweetboxPrice: ticketPrice.sweetboxPrice,
        vipPrice: ticketPrice.vipPrice,
        timePeriod: ticketPrice.timePeriod,
        weekendRate: ticketPrice.weekendRate,
      });
    }
  }, [ticketPrice]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateTicketPrice({ id: ticketPrice.id, ticketData: formValues })
    ).then(() => {
      onSuccess();
      onClose();
      dispatch(fetchAllTicketPrices({ page: 0 }));
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
            Chỉnh sửa Ticket Price
          </h2>
        </div>
        <div className="overflow-auto">
          <form className="overflow-y-auto" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="standardPrice"
                >
                  Standard Price
                </label>
                <input
                  className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base"
                  placeholder="Nhập giá tiêu chuẩn"
                  id="standardPrice"
                  aria-describedby="standardPrice-description"
                  aria-invalid="false"
                  type="number"
                  value={formValues.standardPrice}
                  name="standardPrice"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="sweetboxPrice"
                >
                  Sweetbox Price
                </label>
                <input
                  className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base"
                  placeholder="Nhập giá sweetbox"
                  id="sweetboxPrice"
                  aria-describedby="sweetboxPrice-description"
                  aria-invalid="false"
                  type="number"
                  value={formValues.sweetboxPrice}
                  name="sweetboxPrice"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="vipPrice"
                >
                  VIP Price
                </label>
                <input
                  className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base"
                  placeholder="Nhập giá VIP"
                  id="vipPrice"
                  aria-describedby="vipPrice-description"
                  aria-invalid="false"
                  type="number"
                  value={formValues.vipPrice}
                  name="vipPrice"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="timePeriod"
                >
                  Time Period
                </label>
                <input
                  className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base"
                  placeholder="Nhập thời gian"
                  id="timePeriod"
                  aria-describedby="timePeriod-description"
                  aria-invalid="false"
                  value={formValues.timePeriod}
                  name="timePeriod"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="weekendRate"
                >
                  Weekend Rate
                </label>
                <input
                  className="text-black flex h-14 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-base"
                  placeholder="Nhập giá cuối tuần"
                  id="weekendRate"
                  aria-describedby="weekendRate-description"
                  aria-invalid="false"
                  type="number"
                  value={formValues.weekendRate}
                  name="weekendRate"
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
