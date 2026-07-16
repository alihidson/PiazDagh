const USE_MOCK = true;

const authService = {
  async getCurrentUser() {
    if (USE_MOCK) {
      // Simulate a logged‑in user for testing – return null to simulate logged out
      return {
        id: 1,
        username: 'مهمان',
        email: 'guest@piazdagh.ir',
      };
      // return null; // uncomment to test logged‑out state
    }
    // const response = await axios.get('/api/me');
    // return response.data;
  },

  async login(email, password) {
    if (USE_MOCK) {
      // Fake successful login
      return {
        id: 1,
        username: 'مهمان',
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
};

export default authService;