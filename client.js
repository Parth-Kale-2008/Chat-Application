const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");

let typingTimer;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value) {
        socket.emit("New Text", input.value);

        socket.emit("stopTyping"); 
        input.value = "";
    }
});

socket.on("New Text", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    messages.appendChild(li);
});

input.addEventListener("input", () => {

    socket.emit("typing");

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
        socket.emit("stopTyping");
    }, 1500);
});

socket.on("typing", () => {
    typing.textContent = "typing...";
});

socket.on("stopTyping", () => {
    typing.textContent = "";
});
