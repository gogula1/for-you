const askBtn = document.getElementById("askBtn");
const queryInput = document.getElementById("queryInput");
const responseDiv = document.getElementById("response");

askBtn.addEventListener("click", async () => {
  const query = queryInput.value.trim();
  if (!query) {
    alert("Please type a query!");
    return;
  }

  responseDiv.innerText = "Thinking...";

  try {
    const res = await fetch(`http://localhost:3000/think?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Network response not ok");

    const data = await res.json();
    displayResponse(data);
  } catch (err) {
    responseDiv.innerText = "Error connecting to backend. Make sure server is running.";
    console.error(err);
  }
});

function displayResponse(data) {
  responseDiv.innerHTML = "";

  if (!Array.isArray(data)) data = [data]; // wrap single result

  data.forEach(d => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h3");
    title.innerText = `Level: ${d.level || "info"}`;
    card.appendChild(title);

    if (d.data) {
      for (const key in d.data) {
        const p = document.createElement("p");
        p.innerText = `${key}: ${JSON.stringify(d.data[key], null, 2)}`;
        card.appendChild(p);
      }
    } else if (d.message) {
      const p = document.createElement("p");
      p.innerText = d.message;
      card.appendChild(p);
    }

    responseDiv.appendChild(card);
  });
}
