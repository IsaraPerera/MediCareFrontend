import { Link } from "react-router-dom";
import { useAuth } from "../../libs/AuthContext";

const UserView = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="page" style={{ maxWidth: 560 }}>
      <h3 className="mb-3">My Profile</h3>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Name:</strong> {user.fullName}</li>
          <li className="list-group-item"><strong>Username:</strong> {user.username}</li>
          <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
          <li className="list-group-item"><strong>Role:</strong> {user.role}</li>
        </ul>
      </div>
      <Link to="/profile/edit" className="btn btn-primary mt-3">Edit profile</Link>
    </div>
  );
};

export default UserView;
