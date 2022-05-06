import AddNote from "./AddNote";

const Navigation = function ({ user, onLogout }) {
  if (!user.isLoggedIn) {
    return null;
  }

  const onClick = () => {
    return <AddNote></AddNote>
  }

  return (
    <nav id="nav-bar" class="nav">
      <ul className="nav-list">
        <li className="logout"><a button="logout" onClick={onLogout} id="logout-btn">Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;