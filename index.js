// index.js
const form = document.getElementById('chat-form');
const responseDiv = document.getElementById('response');

form.addEventListener('submit', e => {
  e.preventDefault();
  const prompt = document.getElementById('prompt').value;
  if (prompt === '') {
    alert('Prompt cannot be empty');
    return;
  }
  fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({prompt: prompt})
  }).then(response => response.json())
    .then(data => {
      if (data.error) {
        responseDiv.textContent = `Error: ${data.error}`;
      } else {
        responseDiv.textContent = data.response;
      }
    });
});
