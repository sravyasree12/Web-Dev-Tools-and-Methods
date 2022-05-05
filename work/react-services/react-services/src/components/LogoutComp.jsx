
function LogoutComp({ onLogoutUsername }) {
    return (
        <div className="logout">
            <button onClick={() => { onLogoutUsername();} }>LOGOUT</button>
        </div>
    );
};

export default LogoutComp;