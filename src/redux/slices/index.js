import { combineReducers } from "redux";
import movieSlice from "./adminSlices/movieSlice";
import countrySlice from "./generalSlices/countrySlice";
import genreSlice from "./generalSlices/genreSlice";
import userAdviceSlice from "./generalSlices/userAdviceSlice";
import userSlice from "./adminSlices/userSlice";

import discountSlice from "./adminSlices/discountSlice";

import seatSlice from "./adminSlices/seatSlice";
import bannerSlice from "./adminSlices/bannerSlice";
import reviewSlice from "./adminSlices/reviewSlice";

import roomSlice from "./adminSlices/roomSlice";
import showtimeSlice from "./adminSlices/showtimeSlice";
import { showSeatByRoomId } from "../../services/clientServices/seatClientService";
import seatClientSlice from "./clientSlices/seatClientSlice";
import clientBannerSlice from "./clientSlices/clientBannerSlice";
import clientMovieSlice from "./clientSlices/clientMovieSlice";
import clientReviewSlice from "./clientSlices/clientReviewSlice";
import newsSlice from "./adminSlices/newsSlice";
import ticketSlice from "./adminSlices/ticketPriceSlice";
import ticketPriceSlice from "./adminSlices/ticketPriceSlice";
import clientBookingSlice from "./clientSlices/clientBookingSlice";
import clientPaymentSlice from "./clientSlices/clientPaymentSlice";
import userDetailsSlice from "./clientSlices/userDetailsSlice";
import forgetPasswordSlice from "./generalSlices/forgetPasswordSlice";
// import voucherSlice from "./generalSlices/voucherSlice";

const rootReducers = combineReducers({
  movie: movieSlice,
  country: countrySlice,
  genre: genreSlice,
  userAdvice: userAdviceSlice,
  user: userSlice,
  discount: discountSlice,
  seat: seatSlice,
  banner: bannerSlice,
  review: reviewSlice,
  room: roomSlice,
  news: newsSlice,
  ticketPrice: ticketPriceSlice,
  showtime: showtimeSlice,
  showSeatClient: seatClientSlice,
  clientBanner: clientBannerSlice,
  clientMovie: clientMovieSlice,
  clientReview: clientReviewSlice,
  clientBooking: clientBookingSlice,
  clientPayment: clientPaymentSlice,
  userDetail: userDetailsSlice,
  forgetPassword: forgetPasswordSlice,
  // voucher: voucherSlice,
});
export default rootReducers;
