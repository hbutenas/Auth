import store from '../store';
const authenticateIncomingRequest = async () => {
  const response = await fetch(
    'http://localhost:5555/api/v1/auth/verify-user',
    {
      method: 'POST',
      credentials: 'include'
    }
  );

  const data = await response.json();

  if (data.message) {
    return { message: 'Authentication invalid' };
  } else {
    store.commit('authenticateUser', {
      user_id: data.response.user_id,
      username: data.response.username,
      role: data.response.role
    });
    return { data };
  }
};

export default authenticateIncomingRequest;
