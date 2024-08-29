import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { userContext } from "../../Context/userContext";
import { login } from "../../utils/api";
import {jwtDecode} from "jwt-decode";


export default function Login() {
  const { setuserLogin, setUserId } = useContext(userContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"

  // Form validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .required("Required"),
  });

  // Handle login submission
  const handleLogin = async (values) => {
    setIsLoading(true);
    setApiError(""); // Clear previous API errors
    toast
        .promise(login(values), {
          loading: "Logging in...",
          success: (response) => {
            setuserLogin(response.token);
            let decoded = jwtDecode(response.token);
            setUserId(decoded.id);
            console.log(decoded.id, "Login Login Login");

            // Store token in localStorage or sessionStorage based on "Remember Me"
            if (rememberMe) {
              localStorage.setItem("userToken", response.token);
            } else {
              sessionStorage.setItem("userToken", response.token);
            }

            return "Login successful!";
          },
          error: (error) => {
            setApiError(error.message);
            return error.response?.data?.message || "An error occurred.";
          },
        })
        .then(() => {
          setTimeout(() => navigate("/"), 1000); // 1-second delay before navigation
        })
        .finally(() => {
          setIsLoading(false);
        });
  };

  // Initialize formik
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
      <section className="bg-gray-50">
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ duration: 2000, style: { marginTop: "5rem" } }}
        />
        <div className="flex flex-col items-center justify-center px-6 py-7 mx-auto md:h-[90vh] lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                Sign in to your account
              </h1>
              <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-4 md:space-y-6"
              >
                <div>
                  {formik.touched.email && formik.errors.email && (
                      <div className="alert alert-error gap-2 py-3 mb-3">
                        <span>{formik.errors.email}</span>
                      </div>
                  )}
                  <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="7mada@gmail.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-light-green focus:border-light-green block w-full p-2.5"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                  />
                </div>
                <div>
                  {formik.touched.password && formik.errors.password && (
                      <div className="alert alert-error gap-2 py-3 mb-3">
                        <span>{formik.errors.password}</span>
                      </div>
                  )}
                  <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-light-green focus:border-light-green block w-full p-2.5"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <input
                        id="remember"
                        type="checkbox"
                        className="checkbox checkbox-success"
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label
                        htmlFor="remember"
                        className="ml-3 text-sm text-gray-500"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                      to="/forget-password"
                      className="text-sm font-medium text-light-green hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                    type="submit"
                    className="btn bg-light-green text-white hover:bg-dark-green w-full"
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <span className="loading loading-dots loading-lg"></span>
                  ) : (
                      "Login"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <Link
                      className="link text-dark-green font-medium hover:underline"
                      to="/register"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}
