import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../../layouts/client/header";
import Footer from "../../../layouts/client/footer";
import { formatDate } from "../../../util/formatDate";
import { fetchDiscountId } from "../../../services/generalServices";

export default function VoucherDetail() {
  const { discountId } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.discount);
  const discountData = data?.data?.data?.data;
  console.log(data);
  useEffect(() => {
    dispatch(fetchDiscountId(discountId));
  }, [dispatch, discountId]);

  return (
    <>
      <Header />
      <div className="p-5 bg-[#10141B] min-h-screen flex flex-col items-center">
        <div className="max-w-xl w-full text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {discountData?.code}
          </h2>
          <img
            src={discountData?.imageUrl}
            alt="Voucher"
            className="w-full h-auto object-cover mb-4 rounded-md shadow-lg"
          />
          <div className="text-gray-400 space-y-2">
            <p className="text-gray-400 mb-4">{discountData?.description}</p>
            <p>Discount Percentage: {discountData?.discountPercentage}%</p>
            <p>Valid From: {formatDate(discountData?.validFrom)}</p>
            <p>Valid To: {formatDate(discountData?.validTo)}</p>
            <p>Used: {discountData?.isUsed ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
