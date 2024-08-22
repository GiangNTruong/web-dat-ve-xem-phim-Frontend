import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StrictMode, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import Loading from "./components/clientComponents/Loading.jsx";
import routes from "./routes/index.js";
import MovieDetail from "./pages/client/movieDetail/MovieDetail.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";
import MovieDashboard from "./pages/admin/moviemanagement/MovieDashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* <StrictMode> */}
    {/* <Suspense fallback={ <Loading /> }> */}
    <Provider store={store}>
      <RouterProvider router={routes}></RouterProvider>
    </Provider>
    {/* </Suspense> */}
    {/* </StrictMode> */}
  </>
);
