import api, { TOKEN_STORAGE_KEY } from "./api";

const storeTokens = (data) => {
  if (data.accessToken) localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);
  if (data.refreshToken) localStorage.setItem(`${TOKEN_STORAGE_KEY}_refresh`, data.refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(`${TOKEN_STORAGE_KEY}_refresh`);
};

export const authService = {
  register: async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    storeTokens(data);
    return data;
  },

  login: async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    storeTokens(data);
    return data;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearTokens();
    }
  },

  me: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },

  forgotPassword: async (email) => {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  },

  resetPassword: async (payload) => {
    const { data } = await api.post("/auth/reset-password", payload);
    storeTokens(data);
    return data;
  },
};
