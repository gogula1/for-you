// Send query to backend /think route
async function sendQuery(query) {
  try {
    const response = await fetch(`http://localhost:3000/think?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    const responseDiv = document.getElementById('responseArea');
    responseDiv.innerHTML = ''; // clear previous responses

    for (const key in data.responses) {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${key}:</strong> ${data.responses[key]}`;
      responseDiv.appendChild(p);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    const responseDiv = document.getElementById('responseArea');
    responseDiv.innerHTML = `<p style="color:red;">Error connecting to backend. Make sure server is running.</p>`;
  }
}

// Connect button click
document.getElementById('sendBtn').addEventListener('click', () => {
  const query = document.getElementById('queryInput').value;
  if (query) sendQuery(query);
});
