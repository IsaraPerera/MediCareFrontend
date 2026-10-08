import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../libs/AuthContext";

const NavBar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          MediCare
        </Link>
        <div className="navbar-nav me-auto">
          {isAuthenticated && (
            <>
              <Link className="nav-link" to="/doctors">Doctors</Link>
              <Link className="nav-link" to="/appointments">Appointments</Link>
              {user?.role === "DOCTOR" && (
                <>
                  <Link className="nav-link" to="/consultations">Consultations</Link>
                  <Link className="nav-link" to="/prescriptions">Prescriptions</Link>
                </>
              )}
              {user?.role === "PATIENT" && (
                <Link className="nav-link" to="/prescriptions">My Prescriptions</Link>
              )}
            </>
          )}
        </div>
        <div className="d-flex align-items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link className="btn btn-light btn-sm" to="/profile">
                {user?.fullName}
              </Link>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/signin">Sign In</Link>
              <Link className="btn btn-light btn-sm" to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
