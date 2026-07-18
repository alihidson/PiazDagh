import apiClient from "./apiClient";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const normalizeUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.first_name || "",
    lastName: user.last_name || "",
    bio: user.bio || "",
    dateJoined: user.date_joined || null,
  };
};

const saveTokens = (accessToken, refreshToken) => {
  if (accessToken) {
    localStorage.setItem(
      ACCESS_TOKEN_KEY,
      accessToken,
    );
  }

  if (refreshToken) {
    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      refreshToken,
    );
  }
};

const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

const authService = {
  async getCurrentUser() {
    const accessToken =
      localStorage.getItem(ACCESS_TOKEN_KEY);

    const refreshToken =
      localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!accessToken && !refreshToken) {
      return null;
    }

    const response =
      await apiClient.get("/auth/me/");

    return normalizeUser(response.data);
  },

  async login(username, password) {
    const loginResponse =
      await apiClient.post("/auth/login/", {
        username,
        password,
      });

    saveTokens(
      loginResponse.data.access,
      loginResponse.data.refresh,
    );

    const userResponse =
      await apiClient.get("/auth/me/");

    return normalizeUser(userResponse.data);
  },

  async signup(
    username,
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
  ) {
    const response =
      await apiClient.post("/auth/register/", {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirm: confirmPassword,
      });

    saveTokens(
      response.data.tokens?.access,
      response.data.tokens?.refresh,
    );

    return normalizeUser(response.data.user);
  },

  async logout() {
    const refreshToken =
      localStorage.getItem(REFRESH_TOKEN_KEY);

    try {
      if (refreshToken) {
        await apiClient.post("/auth/logout/", {
          refresh: refreshToken,
        });
      }
    } finally {
      clearTokens();
    }
  },

  async changePassword(
    currentPassword,
    newPassword,
  ) {
    const response =
      await apiClient.post(
        "/auth/change-password/",
        {
          old_password: currentPassword,
          new_password: newPassword,
        },
      );

    return response.data;
  },

  async updateProfile(profileData) {
    const response =
      await apiClient.patch("/auth/me/", {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        bio: profileData.bio,
      });

    return normalizeUser(response.data);
  },
};

export default authService;