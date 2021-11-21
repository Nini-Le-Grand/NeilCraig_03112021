const rateLimit = require('express-rate-limit');

const maxConnections = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
  });

  module.exports = { maxConnections }