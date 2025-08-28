
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => {
                res.status(err.status || 400).json({
                    message: err.message,
                    error: err
                });
            });
    };
};

export { asyncHandler }
