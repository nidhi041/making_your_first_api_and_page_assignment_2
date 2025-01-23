const express = require('express');
const app = express();

// Using a Map for status codes and messages
const statusCodes = new Map([
  [200, "OK: The request has succeeded. The meaning of this status depends on the HTTP method used."],
  [201, "Created: The request has been fulfilled and has resulted in the creation of a resource."],
  [204, "No Content: The server has successfully processed the request, but there is no content to return."],
  [400, "Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax)."],
  [401, "Unauthorized: Authentication is required to access the resource."],
  [403, "Forbidden: The server refuses to authorize the request."],
  [404, "Not Found: The server has not found anything matching the request URI. This is often caused by a missing page or resource."],
  [405, "Method Not Allowed: The HTTP method used is not supported for the requested resource."],
  [429, "Too Many Requests: The user has exceeded the rate limits."],
  [500, "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."],
  [502, "Bad Gateway: The server received an invalid response from the upstream server."],
  [503, "Service Unavailable: The server is temporarily unable to handle the request due to overload or maintenance."],
  [504, "Gateway Timeout: The server did not receive a timely response from the upstream server."]
]);

// Endpoint to fetch status info
app.get('/status-info', (req, res) => {
  const { code } = req.query;
  
  // Convert code to a number and check if it's in the Map
  const statusCode = parseInt(code, 10);
  if (statusCodes.has(statusCode)) {
    res.status(statusCode).json({
      status: statusCode,
      message: statusCodes.get(statusCode)
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "Bad Request: The provided code is not valid or recognized."
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Status Code API is running on http://localhost:${PORT}`);
});