// index.js
const form = document.getElementById("chat-form");
const responseDiv = document.getElementById("response");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const prompt = document.getElementById("prompt").value;
  if (prompt === "") {
    alert("Prompt cannot be empty");
    return;
  }
  form.querySelector(".form__button").classList.add("loading");
  fetch("https://meronstream.azurewebsites.net/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  })
    .then((response) => response.json())
    .then((data) => {
      form.querySelector(".form__button").classList.remove("loading");
      // Clear the previous text
      responseDiv.textContent = "";
      // Reset the width and height of the response div





      if (data.error) {
        console.log(data.error)
        responseDiv.textContent = `${"Something went wrong!"} =(`;
      } else {
        console.log(data);
        responseDiv.classList.add("typing");
        let i = 0;
        const typingInterval = setInterval(() => {
          if (i < data.response.text.length) {
            responseDiv.textContent += data.response.text[i];
            responseDiv.style.width = "auto";
            responseDiv.style.height = "auto";
            i++;
          } else {
            clearInterval(typingInterval);
            responseDiv.classList.remove("typing");
          }
        }, 100);
      }
    });
});
