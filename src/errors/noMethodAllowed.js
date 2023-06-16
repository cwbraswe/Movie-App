function noMethodAllowed(req, res) {
  res.status(405).json({
    error: 'Method not allowed',
  });
};

module.exports = noMethodAllowed;