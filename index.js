const http = require("http");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
res.write("Hello from Render!");
res.end();
}).listen(PORT, () => {
console.log("Server running on port", PORT);
});