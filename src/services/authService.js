// src/services/authService.js

const BASE_URL = "http://127.0.0.1:8000/api";

/**
 * Safely decode JWT payload (base64url → base64)
 */
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    throw new Error("Invalid token");
  }
}

const handleResponse = async (res) => {
  let data;

  try {
    data = await res.json();
  } catch {
    throw new Error("Server did not return JSON");
  }

  if (!res.ok) {
    throw new Error(data.detail || data.message || "Request failed");
  }

  return data;
};

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await handleResponse(res);

    localStorage.setItem("token", data.token);
    return decodeToken(data.token);
  } catch (err) {
    console.error("Signup error:", err.message);
    throw err;
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await handleResponse(res);

    localStorage.setItem("token", data.token);
    return decodeToken(data.token);
  } catch (err) {
    console.error("Signin error:", err.message);
    throw err;
  }
};

export { signUp, signIn };
