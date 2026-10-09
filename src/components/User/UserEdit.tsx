
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
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.put<User>(`/users/${user.id}`, {
        fullName: fullName.trim(),
        email: email.trim(),
      });

      updateUser(res.data);
      navigate("/profile");
    } catch {
      setError(
        "We couldn't update your profile. Check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page page-narrow">
      <div className="section-heading">
        <div>
          <div className="section-eyebrow">Account settings</div>
          <h1 className="section-title">Edit profile</h1>
          <p className="section-subtitle">
            Update the name and email address associated with your account.
          </p>
        </div>
      </div>

      <section className="panel">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="edit-fullname">
            Full name
          </label>
          <input
            id="edit-fullname"
            className="form-control mb-4"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            maxLength={120}
          />

          <label className="form-label" htmlFor="edit-email">
            Email address
          </label>
          <input
            id="edit-email"
            className="form-control mb-4"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={180}
          />

          <div className="d-flex flex-wrap gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving changes..." : "Save changes"}
            </button>

            <button
              type="button"
              className="btn btn-light"
              onClick={() => navigate("/profile")}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default UserEdit;