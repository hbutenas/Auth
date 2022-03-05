const usernameHelper = username => {
  const lowerCasedUsername = username.toLowerCase();
  return (
    lowerCasedUsername.charAt(0).toUpperCase() + lowerCasedUsername.slice(1)
  );
};

module.exports = { usernameHelper };
