const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/api.log");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

// Middleware to log all incomming request for debugging
function logger(req, res, next) {
    // Log the incoming request
    logStream.write(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`
    );
    logStream.write(`Headers: ${JSON.stringify(req.headers)}\n`);
    logStream.write(`Body: ${JSON.stringify(req.body)}\n`);

    // Log the outgoing response
    res.on("finish", () => {
        logStream.write(`Status Code: ${res.statusCode}\n`);
        logStream.write(`Body: ${JSON.stringify(res.body)}\n`);
        logStream.write("\n");
    });

    next();
}

module.exports = {
    logger
}