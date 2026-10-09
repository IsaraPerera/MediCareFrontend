
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../libs/AuthContext";

const NavBar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? " active" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg mc-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-mark">✚</span>
          <span>MediCare</span>
        </Link>

        <div className="navbar-nav me-auto">
          {isAuthenticated && (
            <>
              <NavLink className={linkClass} to="/doctors">
                Find a doctor
              </NavLink>

              <NavLink className={linkClass} to="/appointments">
                Appointments
              </NavLink>

              {user?.role === "DOCTOR" && (
                <>
                  <NavLink className={linkClass} to="/consultations">
                    Consultations
                  </NavLink>
                  <NavLink className={linkClass} to="/prescriptions">
                    Prescriptions
                  </NavLink>
                </>
              )}

              {user?.role === "PATIENT" && (
                <NavLink className={linkClass} to="/prescriptions">
                  Prescriptions
                </NavLink>
              )}
            </>
          )}
        </div>

        <div className="d-flex align-items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link
                className="nav-user d-none d-sm-inline-block"
                to="/profile"
              >
                {user?.fullName}
              </Link>

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-light btn-sm" to="/signin">
                Sign in
              </Link>
              <Link className="btn btn-primary btn-sm" to="/signup">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;