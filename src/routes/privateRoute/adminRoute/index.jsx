import React from "react";
import MovieDetailPage from "../../../pages/admin/movieDetail/movieDetail";
import MovieDashboard from "../../../pages/admin/moviemanagement/MovieDashboard";
import { useParams } from "react-router-dom";
import FormEditMovie from "../../../components/adminComponents/movie/FormEditMovie";

import VoucherManagement from "../../../pages/admin/vouchetManagement/VoucherManagement";

import SeatManagement from "../../../pages/admin/SeatManagement";
import BannerManagement from "../../../pages/admin/bannerManagement/BannerManagement";
import ReviewManagement from "../../../pages/admin/reviewManagement/ReviewManagement";
import RoomManagement from "../../../pages/admin/roomManagement/RoomManagement";
import LayoutIndex from "../../../layouts/admin/layoutIndex";
import NewsManagement from "../../../pages/admin/newsManagement/NewsManagement";
import TickePricetManagement from "../../../pages/admin/ticketPriceManagement/TickePricetManagement";

const Dashboard = React.lazy(() => import("../../../pages/admin/Dashboard"));
const PaymentManagement = React.lazy(() =>
  import("../../../pages/admin/PaymentManagement")
);
const TicketManagement = React.lazy(() =>
  import("../../../pages/admin/TicketManagement")
);
const UserManagement = React.lazy(() =>
  import("../../../pages/admin/usermanagement/UserManagement")
);
const privateRoutes = [
  {
    path: "/admin",
    element: <LayoutIndex />,
    children: [
      //Trang layout admin, ai cần nhét component nào vào khu vực quản lý ở giữa thì viết object con vào trong phần này
      {
        path: "movie-dashboard",
        element: <MovieDashboard />,
      },
      {
        path: "movie-detail/:id",
        element: <MovieDetailPage />,
      },
      {
        path: "movie-edit/:id",
        element: <FormEditMovie />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
      {
        path: "voucher-management",
        element: <VoucherManagement />,
      },
      {
        path: "news-management",
        element: <NewsManagement />,
      },
      {
        path: "ticket-price-management",
        element: <TickePricetManagement />,
      },
      {
        path: "room-dashboard",
        element: <RoomManagement />,
      },
      {
        path: "/admin/payment-management",
        element: <PaymentManagement />,
      },
      {
        path: "/admin/review-management",
        element: <ReviewManagement />,
      },
      {
        path: "/admin/banner-management",
        element: <BannerManagement />,
      },
      {
        path: "/admin/seat-management",
        element: <SeatManagement />,
      },
      {
        path: "/admin/ticket-management",
        element: <TicketManagement />,
      },
    ],
  },
];

export default privateRoutes;
