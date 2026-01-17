const emotions = require("./data/level1_emotions.json");
const actions = require("./data/level2_actions.json");
const body = require("./data/level3_body_nature.json");
const ethics = require("./data/level4_ethics_purpose.json");

function think(query) {
  if (!query) return { error: "No query provided" };

  const keys = query.toLowerCase().split(/[ ,]+/); // split by space or comma
  const results = [];

  keys.forEach(key => {
    if (emotions[key]) results.push({ level: "emotion", data: emotions[key] });
    else if (actions[key]) results.push({ level: "action", data: actions[key] });
    else if (body[key]) results.push({ level: "body-nature", data: body[key] });
    else if (ethics[key]) results.push({ level: "ethics-purpose", data: ethics[key] });
  });

  if (results.length === 0) {
    return { message: "No exact match found", suggestion: "Try emotion, action, body or purpose keywords" };
  }

  return results;
}
