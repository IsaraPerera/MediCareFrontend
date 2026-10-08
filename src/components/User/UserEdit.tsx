import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../libs/api";
import { useAuth } from "../../libs/AuthContext";
import { User } from "../../models/User";

const UserEdit = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [error, setError] = useState("");

  if (!user) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put<User>(`/users/${user.id}`, { fullName, email });
      updateUser(res.data);
      navigate("/profile");
    } catch {
      setError("Could not update profile");
    }
  };

  return (
    <div className="page" style={{ maxWidth: 480 }}>
      <h3 className="mb-3">Edit Profile</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" value={fullName}
          onChange={(e) => setFullName(e.target.value)} required />
        <input className="form-control mb-3" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <button className="btn btn-primary me-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/profile")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
