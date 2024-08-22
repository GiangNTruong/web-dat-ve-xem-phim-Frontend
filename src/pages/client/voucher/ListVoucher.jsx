import React, { useEffect, useState } from "react";
import Header from "../../../layouts/client/header";
import Footer from "../../../layouts/client/footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserDiscount } from "../../../services/generalServices";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../util/formatDate";

export default function ListVoucher() {
  const dispatch = useDispatch();
  const voucherData = useSelector((state) => state.discount);
  const voucherList = voucherData?.data?.data?.data?.content;
  const totalPages = voucherData?.data?.totalPages;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllUserDiscount(page));
  }, [page]);

  const handleChangePage = (toAdd) => {
    if (page + toAdd < 1 || page + toAdd > totalPages) {
      return;
    }
    setPage((prev) => prev + toAdd);
  };

  const handleSeeVoucher = (discountId) => {
    navigate(`../discount/${discountId}`, { replace: true });
  };

  //Lọc các voucher sử dụng
  const filteredVoucherList = voucherList?.filter((voucher) => voucher.isUsed);

  return (
    <>
      <Header />
      <div className="bg-black pt-20 xl:pt-28 pb-10 xl:pb-20 px-4 xl:px-0">
        <div className="mx-auto max-w-7xl">
          <h3 className="text-white text-2xl font-bold mb-4 xl:mb-10 text-center">
            Khuyến mãi
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
            {filteredVoucherList?.map((voucher) => (
              <button
                onClick={() => handleSeeVoucher(voucher.id)}
                key={voucher.id}
              >
                <div className="border border-gray-700 rounded-md overflow-hidden cursor-pointer">
                  <div className="relative h-[210px] cursor-pointer overflow-hidden">
                    <img
                      alt="promotion"
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      className="object-cover hover:scale-110 transition object-center"
                      sizes="(min-width: 1300px) 303px, calc(100vw - 66px)"
                      src={voucher.imageUrl}
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: 0,
                        color: "transparent",
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-400 mb-2">
                      {formatDate(voucher.validFrom)} đến{" "}
                      {formatDate(voucher.validTo)}
                    </p>
                    <h3 className="text-white font-bold">
                      {voucher.description}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className=" flex items-center justify-end space-x-2 mt-4">
            <button
              className={`text-white inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent h-9 rounded-md px-3 ${
                page === 1
                  ? "bg-slate-500"
                  : "hover:bg-red-300 hover:text-accent-foreground"
              }`}
              onClick={() => handleChangePage(-1)}
              disabled={page === 1}
            >
              Quay lại
            </button>
            <button
              className={`text-white inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent h-9 rounded-md px-3 ${
                page === totalPages
                  ? "bg-slate-500"
                  : "hover:bg-red-300 hover:text-accent-foreground"
              }`}
              onClick={() => handleChangePage(1)}
              disabled={page === totalPages}
            >
              Tiếp theo
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
