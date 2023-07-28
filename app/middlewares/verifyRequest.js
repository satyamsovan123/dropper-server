const verifyRequest = (param) => {
  return async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error(`Error verify`, error);
      return res.status(400).send({ error: "Invalid request." });
    }
  };
};

module.exports = { verifyRequest };
