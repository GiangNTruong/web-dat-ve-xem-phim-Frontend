import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "../../../services/clientServices/clientBookingService";
import { formatDate } from "../../../util";
import { fetchPaymentHistory } from "../../../services/clientServices/clientPaymentService";

function BookingHistory()
{
    //Về sau sẽ truyền userId vào thông qua prop/ param để gọi API 
    const dispatch = useDispatch();
    // const bookingData = useSelector(state => state.clientBooking);
    const paymentData = useSelector(state => state.clientPayment);
    // const bookingHistoryList = bookingData?.data?.data?.data;
    const paymentHistoryList = paymentData?.data?.data?.data;
    useEffect(() =>
    {
        // dispatch(fetchBookingHistory(1));
        dispatch(fetchPaymentHistory(1));
    }, []);
    return (
        <div className="p-5">
            { console.log(paymentData) }
            <p className="text-3xl font-bold">Lịch sử đặt vé của bạn</p>
            <table className="w-full border-black border text-center mt-6">
                <thead className="border border-black">
                    <tr>
                        <th className="border border-black">Ngày đặt vé</th>
                        <th className="border border-black">Tổng giá vé</th>
                        <th className="border border-black">Tên bộ phim</th>
                        <th className="border border-black">Phương thức thanh toán</th>
                        <th className="border border-black">Trạng thái thanh toán</th>
                    </tr>
                </thead>
                <tbody className="border border-black">
                    { paymentHistoryList?.map(payment =>
                    {
                        return (<tr>
                            <td className="border border-black">{ formatDate(payment.booking.bookingDate) }</td>
                            <td className="border border-black">{ payment.booking.totalPrice }</td>
                            <td className="border border-black">{ payment.booking.showtime.movie.title }</td>
                            <td className="border border-black">{ payment.paymentMethod }</td>
                            <td className="border border-black">{
                                payment.paymentStatus === "PAID" ? "Đã thanh toán"
                                    : payment.paymentStatus === "CANCELED" ? "Đã hủy"
                                        : payment.paymentStatus === "PENDING" ? "Đang chờ thanh toán"
                                            : "Đã bị từ chối thanh toán" }</td>
                        </tr>);
                    }
                    ) }
                </tbody>
            </table>
        </div>
    );
}

export default BookingHistory;