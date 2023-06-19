import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    email: '',
    firstName: '',
    lastName: '',
  }),

  actions: {
    setAuth(email, firstName, lastName) {
      this.email = email;
      this.firstName = firstName ? firstName : '';
      this.lastName = lastName ? lastName : '';
    }
    // Todo create resetAuth
  },

  getters: {
    getAuth(state) {
      return {
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName
      }
    }
  },
  persist: true,
});