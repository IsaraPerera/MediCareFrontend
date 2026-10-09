
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../libs/AuthContext";
import { Role } from "../../models/User";

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "PATIENT" as Role,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signUp(form);
      navigate("/");
    } catch {
      setError(
        "We couldn't create your account. Check your details or try a different username or email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-layout">
        <aside className="auth-aside">
          <div>
            <Link to="/" className="navbar-brand text-white">
              <span className="brand-mark">✚</span>
              MediCare
            </Link>

            <h2>Take a better step toward your health.</h2>
            <p>
              Create an account to make appointments and access your healthcare
              information more conveniently.
            </p>
          </div>

          <div className="aside-bottom">
            <div className="auth-aside-badge">
              ✦ &nbsp; Care made simpler
            </div>
            <p className="mt-4 mb-0 small">
              Your healthcare journey, organised in one place.
            </p>
          </div>
        </aside>

        <div className="auth-form">
          <div className="section-eyebrow">Get started</div>
          <h1>Create account</h1>
          <p className="section-subtitle mb-4">
            Fill in your details to join MediCare.
          </p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="signup-fullname">
              Full name
            </label>
            <input
              id="signup-fullname"
              className="form-control"
              name="fullName"
              placeholder="e.g. John Fernando"
              autoComplete="name"
              value={form.fullName}
              onChange={change}
              required
            />

            <label className="form-label mt-3" htmlFor="signup-username">
              Username
            </label>
            <input
              id="signup-username"
              className="form-control"
              name="username"
              placeholder="Choose a username"
              autoComplete="username"
              value={form.username}
              onChange={change}
              required
            />

            <label className="form-label mt-3" htmlFor="signup-email">
              Email address
            </label>
            <input
              id="signup-email"
              className="form-control"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={change}
              required
            />

            <label className="form-label mt-3" htmlFor="signup-password">
              Password
            </label>
            <div className="input-group">
              <input
                id="signup-password"
                className="form-control"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
                value={form.password}
                onChange={change}
                minLength={6}
                required
              />
              <button
                type="button"
                className="btn btn-light border"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p className="form-hint mt-2">
              Use at least 6 characters.
            </p>

            <label className="form-label mt-2" htmlFor="signup-role">
              Account type
            </label>
            <select
              id="signup-role"
              className="form-select mb-4"
              name="role"
              value={form.role}
              onChange={change}
            >
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
            </select>

            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create my account →"}
            </button>
          </form>

          <p className="auth-footer">
            Already registered? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUp;