const chat = require("./chat");

const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="styles.css">
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<h3 style="header"> Chat </h3>
    <ol class="messages">` +
      // Fill in! 
      Object.values(chat.messages).map(
        obj => `<ul><b>${obj.sender}</b>: ${obj.text}  <i class='timestamp'>Sent at ${obj.timestamp}</i></ul>`
        ).join(''); +
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<h3> Users </h3>
    <ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    // Fill in!
    return `
    <form action="/chat" method="POST"><br>
    <input type="hidden" name="sender" value="Sravya"><br>
    <input placeholder="Your Message Here" type="text" name="text"><br>
    <br>` + 
    `<button type="submit">Send</button>
    </form>`
  }
  
};
module.exports = chatWeb;
