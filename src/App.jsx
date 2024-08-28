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
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <WishList />
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
        <RouterProvider router={Routes}></RouterProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
