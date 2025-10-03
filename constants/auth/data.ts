export const authData = {
  isLoggedIn: false, // default false
  role: null as "admin" | "landlord" | "tenant" | null, // store user type
};

export const authDataLogin = {
  isLoggedIn: false,
  role: null,
  username: "",
};
