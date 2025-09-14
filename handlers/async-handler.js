
// A wrapper to handle async route handlers and send standardized responses
exports.asyncHandler = (fn) => {
  return async (req, res, next) => {
    const result = await Promise.resolve(fn(req, res, next)).catch(next);

    if (res.headersSent) return;

    const apiResponse = {
      data: result,
      ok: true,
    };

    res.status(200).json(apiResponse);
  };
};
