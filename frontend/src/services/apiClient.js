import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let pendingRequests = [];

const processPendingRequests = (
  error,
  accessToken = null,
) => {
  pendingRequests.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(accessToken);
    }
  });

  pendingRequests = [];
};

apiClient.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("access_token");

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized =
      error.response?.status === 401;

    const isLoginRequest =
      originalRequest?.url?.includes(
        "/auth/login/",
      );

    const isRegisterRequest =
      originalRequest?.url?.includes(
        "/auth/register/",
      );

    const isRefreshRequest =
      originalRequest?.url?.includes(
        "/auth/refresh/",
      );

    if (
      !isUnauthorized ||
      originalRequest?._retry ||
      isLoginRequest ||
      isRegisterRequest ||
      isRefreshRequest
    ) {
      return Promise.reject(error);
    }

    const refreshToken =
      localStorage.getItem("refresh_token");

    if (!refreshToken) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({
          resolve,
          reject,
        });
      }).then((newAccessToken) => {
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh/`,
        {
          refresh: refreshToken,
        },
      );

      const newAccessToken =
        response.data.access;

      const newRefreshToken =
        response.data.refresh;

      localStorage.setItem(
        "access_token",
        newAccessToken,
      );

      if (newRefreshToken) {
        localStorage.setItem(
          "refresh_token",
          newRefreshToken,
        );
      }

      processPendingRequests(
        null,
        newAccessToken,
      );

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      processPendingRequests(
        refreshError,
        null,
      );

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;