import { Link } from "react-router-dom";
import { useAuth } from "../libs/AuthContext";

const Intro = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="page">
      <div className="p-5 mb-4 bg-white rounded-3 shadow-sm">
        <h1 className="display-5 fw-bold">Welcome to MediCare</h1>
        <p className="lead">
          Book doctor appointments, manage consultations and keep your prescriptions in one place.
        </p>
        {isAuthenticated ? (
          <>
            <p>Signed in as <strong>{user?.fullName}</strong> ({user?.role})</p>
            <Link to="/doctors" className="btn btn-primary me-2">Find a doctor</Link>
            <Link to="/appointments" className="btn btn-outline-primary">My appointments</Link>
          </>
        ) : (
          <>
            <Link to="/signin" className="btn btn-primary me-2">Sign In</Link>
            <Link to="/signup" className="btn btn-outline-primary">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Intro;
