import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import NotFound from "./components/NotFound/NotFound";
import Home from './components/Home/Home';
import WishList from './components/WishList/WishList';

let Routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/brands", element: <Brands /> },
      { path: "/register", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/categories", element: <Categories /> },
      { path: "/products", element: <Products /> },
      { path: "/wishlist", element: <WishList /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={Routes}></RouterProvider>;
}

export default App;
