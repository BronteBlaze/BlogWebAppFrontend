import API from ".";

export const SignUpAPI = (userData) =>
  API.post("/register", {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    phone_number: userData.phone_number,
    password: userData.password,
    password_confirmation: userData.password_confirmation,
  });

export const SignInAPI = (email, password) =>
  API.post("/login", { email, password });

export const checkAuthAPI = () => API.get("/api/user");

export const SignOutAPI = () => API.post("/logout");

export const UploadProfileAPI = (userProfile) =>
  API.post("/api/profile_pic", userProfile);
