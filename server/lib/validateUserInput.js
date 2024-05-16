const validateUserInput = (input) => {
  if (input.username && typeof input.username !== 'string') {
    return 'Username must be a string';
  }

  if (input.password && typeof input.password !== 'string') {
    return 'Password must be a string';
  }

  return null;
};

module.exports = validateUserInput;