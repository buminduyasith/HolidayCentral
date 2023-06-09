function notFound(req, res, next) {
    res.status(404);
    const error = new Error("Not Found - " + req.originalUrl);
    next(error);
}

function errorHandlers(err, req, res, next) {
    console.log(err)
    res.status(err.status || res.statusCode || 500);
    res.json({
        message: err.message,
        stack: process.env.ERRORSTACK === "true" ? err.stack : "",
    });
}


module.exports = {
    notFound,
    errorHandlers
}