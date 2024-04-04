const sendErrorResponse = (res, statusCode, errorMessage) => {
    res.status(statusCode).send({ error: errorMessage });
  };
  
  module.exports = sendErrorResponse;