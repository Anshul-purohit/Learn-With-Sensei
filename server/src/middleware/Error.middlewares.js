// error.middleware.js

// Error-handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack trace

    // Set the HTTP status code and send a JSON response with error details
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        data: null
    });
}

module.exports = errorHandler;
