import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./publicRoute/index.jsx";
import privateRoutes from "./privateRoute/adminRoute/index.jsx";
import privateUserRoutes from "./privateRoute/clientRoute/index.jsx";

const routes = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
  ...privateUserRoutes,
]);

export default routes;
