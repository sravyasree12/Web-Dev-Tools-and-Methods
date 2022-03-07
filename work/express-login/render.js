const render = {
  update: function(userName) {
    return `
    <form action="/login" method="POST"> 
        <link rel="stylesheet" type="text/css" href="styles.css">
        Current Username:  ${userName}<br>
        Update Username: <input type="text" placeholder="Enter New Username" pattern="[a-zA-Z0-9]+" minlength="3" maxlength="10"><br>
        <button type="submit">Update</button>
    </form>`;
  },

  loggedIn: function(userName, updateIcon, logoutIcon) {
    return `   
    You are logged in as <b>${userName}</b><br>
    <form action="/logout" method="POST">
        <link rel="stylesheet" type="text/css" href="styles.css">
        <button type= "submit">Logout <img src=${logoutIcon}/></button>
    </form>
    <form action="/update" method="POST">
        <link rel="stylesheet" type="text/css" href="styles.css">
        <button type= "submit">Update <img src=${updateIcon}/></button>
    </form>`;
  },

  logInPage: function(logoutIcon){
    return `
    <form action="/login" method="POST"> 
        <link rel="stylesheet" type="text/css" href="styles.css">
        <label for="userName"><b>Username</b></label><br>
        <input type="text" placeholder="Enter Username" name="userName" pattern="[a-zA-Z0-9]+" minlength="3" maxlength="10"><br>
        <label>* Username can contain only alpha-numeric letters with min length 3 and max length 10 </label>
        <button type= "submit" id= "loginButton">Login <img src=${logoutIcon}/></button>
    </form>
    `;
  }
};
module.exports = render;