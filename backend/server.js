const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { think } = require("./thinker");

const app = express();
const PORT = 3000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(helmet());
app.use(express.json());

// ===== ROOT CHECK =====
app.get("/", (req, res) => {
  res.send("For You backend is running");
});

// ===== THINK ROUTE =====
app.get("/think", (req, res) => {
  const query = req.query.q;
  const result = think(query);
  res.json(result);
});


  if (!query) {
    return res.json({
      error: "No query provided",
      example: "/think?q=ego"
    });
  }

  const result = think(query);
  res.json(result);


// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
