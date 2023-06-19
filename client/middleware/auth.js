import { navigateTo } from "nuxt/app";
export default defineNuxtRouteMiddleware(async (to, from) => {

  // make sure that it's a web request
  if (process.client) {
    // Identify user
    const request = await fetch('http://localhost:5000/api/v1/auth/identify', {
      method: 'GET',
      'credentials': 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const response = await request.json();

    // User unauthorized
    if (!response.email) return await navigateTo('/');

    return true;
  }
});

//  TODO - use Pinia state, on success request set state, on failed reset state