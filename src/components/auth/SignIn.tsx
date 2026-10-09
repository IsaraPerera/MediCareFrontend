
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../libs/AuthContext";

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ username, password });
      navigate("/");
    } catch {
      setError("Sign-in failed. Please check your username and password.");
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

            <h2>Your care journey starts here.</h2>
            <p>
              Sign in to manage your appointments and keep your healthcare
              journey organised.
            </p>
          </div>

          <div className="aside-bottom">
            <div className="auth-aside-badge">
              ♥ &nbsp; Your health matters
            </div>
            <p className="mt-4 mb-0 small">
              A simpler way to stay connected with your care.
            </p>
          </div>
        </aside>

        <div className="auth-form">
          <div className="section-eyebrow">Welcome back</div>
          <h1>Sign in</h1>
          <p className="section-subtitle mb-4">
            Enter your account details to continue.
          </p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="signin-username">
              Username
            </label>
            <input
              id="signin-username"
              className="form-control mb-3"
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label className="form-label" htmlFor="signin-password">
              Password
            </label>
            <div className="input-group mb-4">
              <input
                id="signin-password"
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-light border"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in to MediCare →"}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignIn;