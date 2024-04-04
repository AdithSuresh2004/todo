const validateUserInput = (username, password) => {
  if (!username || !username.trim()) {
    return "Username is required";
  }

  if (!password || !password.trim()) {
    return "Password is required";
  }

  return null;
};

module.exports = validateUserInput;
