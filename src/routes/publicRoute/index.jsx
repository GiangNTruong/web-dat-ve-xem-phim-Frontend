import React from "react";
import MovieDetail from "../../pages/client/movieDetail/MovieDetail";
import HotMovie from "../../pages/client/hotMovieList/HotMovie";
import SearchMovie from "../../pages/client/searchMovie/SearchMovie";

import AllMoviePable from "../../pages/client/allMoviePageable/AllMoviePageable";

import ChangePassword from "../../pages/changePassword/ChangePassword";

import BookingHistory from "../../pages/client/bookingHistory/BookingHistory";
import NewsList from "../../pages/client/news/NewsList";
import NewsCardItem from "../../pages/client/news/NewsCardItem";
import NewsDetailPage from "../../pages/client/news/NewsDetailPage";
import ListVoucher from "../../pages/client/voucher/ListVoucher";
import VoucherDetail from "../../pages/client/voucher/VoucherDetail";

const Home = React.lazy(() => import("../../pages/client/Home"));
// import Home from "../../pages/client/Home";
const Movies = React.lazy(() => import("../../pages/client/Movies"));
// const MoviesDetail = React.lazy(() =>
//   import("../../pages/client/movieDetail/MovieDetail")
// );

const Payment = React.lazy(() => import("../../pages/client/Payment"));
const TicketPrice = React.lazy(() => import("../../pages/client/TicketPrice"));

const PageNotFound = React.lazy(() => import("../../pages/PageNotFound"));

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/movies-detail",
    element: <MovieDetail />,
  },
  // {
  //   path: "/user-detail",
  //   element: <UserDetail />,
  // },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/ticket-price",
    element: <TicketPrice />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/list-voucher",
    element: <ListVoucher />,
  },
  {
    path: "discount/:discountId",
    element: <VoucherDetail />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/movie-hot",
    element: <HotMovie />,
  },
  {
    path: "/movie-search",

    element: <SearchMovie />,
  },
  {
    path: "/movie-all",
    element: <AllMoviePable />,
  },
  {
    path: "/booking-history",
    element: <BookingHistory />,
  },
  {
    path: "/news",
    element: <NewsList />,
  },
  {
    path: "news/:newsId",
    element: <NewsDetailPage />,
  },
];

export default publicRoutes;
