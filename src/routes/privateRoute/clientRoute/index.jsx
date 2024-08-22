import UserDetail from "../../../pages/client/userDetail/UserDetail";

const privateUserRoutes = [
  {
    path: "/user",
    children: [
      //Trang layout user, ai cần nhét component nào vào khu vực quản lý ở giữa thì viết object con vào trong phần này
      {
        path: "user-detail",
        element: <UserDetail />,
      },
    ],
  },
];

export default privateUserRoutes;
