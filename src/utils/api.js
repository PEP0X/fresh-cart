import axios from "axios";

const API_BASE_URL = "https://ecommerce.routemisr.com";

// SignUp API
export const signup = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/signup`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error during signup API call:", error);
    throw error;
  }
};

// Login API
export const login = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/signin`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error during login API call:", error);
    throw error;
  }
};

// Get Products API

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/products`);
    return response.data.data;
  } catch (error) {
    console.error("Error during getProducts API call:", error);
    throw error;
  }
};