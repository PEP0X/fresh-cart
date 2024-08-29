import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import WishList from "./components/WishList/WishList";
import UserContextProvider from "./Context/userContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import Checkout from "./components/Checkout/Checkout.jsx";
import Orders from "./components/Orders/Orders.jsx";
import ForgetPsw from "./components/ForgetPsw/ForgetPsw.jsx";
import VerifyCode from "./components/VerifyCode/VerifyCode.jsx";
import ResetPsw from "./components/ResetPsw/ResetPsw.jsx";

let Routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/forget-password",
        element: (
            <ForgetPsw />
        ),
      },{
        path: "/verify",
        element: (
            <VerifyCode />
        ),
      },
      {
        path: "/reset-password",
        element: (
            <ResetPsw />
        ),
      },
      {
        path: "/brands",
        element: (
          <PrivateRoute>
            <Brands />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/categories",
        element: (
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "/allorders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:cartId",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/productdetails/:category/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={Routes}></RouterProvider>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
