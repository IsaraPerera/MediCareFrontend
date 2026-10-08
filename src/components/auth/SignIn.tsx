import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../libs/AuthContext";

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login({ username, password });
      navigate("/");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="page" style={{ maxWidth: 420 }}>
      <h3 className="mb-3">Sign In</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)} required />
        <input className="form-control mb-3" type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-primary w-100">Sign In</button>
      </form>
      <p className="mt-3">
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default SignIn;
