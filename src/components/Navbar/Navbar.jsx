import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/freshcart-logo.svg";
import { FaHeart } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { PiSignInBold } from "react-icons/pi";
import { PiSignOut } from "react-icons/pi";
import { userContext } from "../../Context/userContext";
export default function Navbar() {
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(userContext);
  let handleSignout = () => {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wishlistItemCount = 5;
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="container mx-auto">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
                onClick={toggleDropdown}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              {dropdownOpen && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link
                      to=""
                      className="btn btn-ghost"
                      onClick={closeDropdown}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      className="btn btn-ghost"
                      onClick={closeDropdown}
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/categories"
                      className="btn btn-ghost"
                      onClick={closeDropdown}
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/brands"
                      className="btn btn-ghost"
                      onClick={closeDropdown}
                    >
                      Brands
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <Link className="btn" to="">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            {userLogin !== null ? (
              <>
                <ul className="menu menu-horizontal px-1">
                  <li>
                    <Link to="" className="btn btn-ghost">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="btn btn-ghost">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories" className="btn btn-ghost">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="/brands" className="btn btn-ghost">
                      Brands
                    </Link>
                  </li>
                </ul>
              </>
            ) : null}
          </div>
          <div className="navbar-end">
            {/* Cart */}
            <div className="relative">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
                onClick={toggleCart}
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {/* Indicator of Cart */}
                  <span className="badge badge-sm  indicator-item bg-dark-green text-white">
                    8
                  </span>
                </div>
              </div>
              {cartOpen && (
                <div
                  ref={cartRef}
                  tabIndex={0}
                  className="absolute right-0 mt-2 w-52 card card-compact dropdown-content bg-base-100 z-[1] shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">8 Items</span>
                    <span className="text-green-800">Subtotal: $999</span>
                    <div className="card-actions">
                      <Link className="btn bg-emerald-400 btn-block" to="/cart">
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Wishlist */}
            <Link className="btn btn-circle" to="/wishlist">
              <div className="indicator">
                <FaHeart className="text-lg" />
                {wishlistItemCount > 0 && (
                  <span
                    className="badge badge-sm indicator-item bg-dark-green text-white"
                    style={{ top: "-4px", right: "-5px" }}
                  >
                    {wishlistItemCount}
                  </span>
                )}
              </div>
            </Link>
            {userLogin !== null ? (
              <button
                className="btn btn-ghost bg-red-400 text-white ms-3 hover:bg-red-600 "
                onClick={handleSignout}
              >
                <PiSignOut />
                Signout
              </button>
            ) : (
              <>
                <Link
                  className="btn btn-ghost bg-light-green text-white ms-3 hover:bg-green-600"
                  to="/login"
                >
                  <PiSignInBold />
                  Login
                </Link>
                <Link
                  className="btn btn-ghost bg-light-green text-white ms-3 hover:bg-green-600 "
                  to="/register"
                >
                  <FaUserPlus />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
