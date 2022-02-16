const users = {
    "Amit": "Amit",
    "Bao": "Bao",
    "Sravya": "Sravya",
};

const messages = [
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  },
];

function addMessage({ sender, text }) {
  // Fill in!
  const timeElapsed = Date.now();
  const timestamp = new Date(timeElapsed);
  messages.push({ sender, text, timestamp })
};

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

