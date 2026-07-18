const USE_MOCK = true;

const authService = {
  async getCurrentUser() {
    if (USE_MOCK) {
      return {
        id: 1,
        username: "مهمان",
        email: "guest@piazdagh.ir",
        firstName: "علی",
        lastName: "اکبری",
        bio: "عاشق آشپزی ایرانی",
      };
    }
    // const response = await axios.get('/api/me');
    // return response.data;
  },

  async login(email, password) {
    if (USE_MOCK) {
      // Fake successful login
      return {
        id: 1,
        username: "مهمان",
        email,
      };
    }
    // const response = await axios.post('/api/login', { email, password });
    // return response.data;
  },

  async logout() {
    if (USE_MOCK) {
      return;
    }
    // await axios.post('/api/logout');
  },

  async signup(name, email, password) {
    if (USE_MOCK) {
      // Fake successful registration
      return {
        id: 1,
        username: name,
        email,
      };
    }
    // const response = await axios.post('/api/signup', { name, email, password });
    // return response.data;
  },

  async changePassword(currentPassword, newPassword) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { success: true };
    }
    // const response = await axios.post('/api/auth/change-password/', {
    //   old_password: currentPassword,
    //   new_password: newPassword,
    // });
    // return response.data;
  },

  async updateProfile(profileData) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        ...profileData,
        id: 1,
      };
    }
    // const response = await axios.patch('/api/auth/me/', {
    //   first_name: profileData.firstName,
    //   last_name: profileData.lastName,
    //   bio: profileData.bio,
    // });
    // return response.data;
  },
};

export default authService;
