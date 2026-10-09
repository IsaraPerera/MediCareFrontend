
import { Link } from "react-router-dom";
import { useAuth } from "../../libs/AuthContext";

const UserView = () => {
  const { user } = useAuth();

  if (!user) return null;

  const initials = user.fullName
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const roleLabel = user.role
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <main className="page page-narrow">
      <div className="section-heading">
        <div>
          <div className="section-eyebrow">Account settings</div>
          <h1 className="section-title">My profile</h1>
          <p className="section-subtitle">
            Review your account details and keep them up to date.
          </p>
        </div>
      </div>

      <section className="panel">
        <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
          <div className="doctor-avatar mb-0">{initials}</div>
          <div>
            <h2 className="h4 mb-1">{user.fullName}</h2>
            <p className="text-muted mb-2">{user.email}</p>
            <span className="doctor-specialty">{roleLabel}</span>
          </div>
        </div>

        <hr />

        <div className="profile-row">
          <div className="profile-label">Full name</div>
          <div className="profile-value">{user.fullName}</div>
        </div>

        <div className="profile-row">
          <div className="profile-label">Username</div>
          <div className="profile-value">{user.username}</div>
        </div>

        <div className="profile-row">
          <div className="profile-label">Email address</div>
          <div className="profile-value">{user.email}</div>
        </div>

        <div className="profile-row">
          <div className="profile-label">Account type</div>
          <div className="profile-value">{roleLabel}</div>
        </div>

        <div className="mt-4">
          <Link to="/profile/edit" className="btn btn-primary">
            Edit profile →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default UserView;