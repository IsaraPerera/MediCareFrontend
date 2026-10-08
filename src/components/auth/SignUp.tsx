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

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(form);
      navigate("/");
    } catch {
      setError("Could not create account. Username or email may already exist.");
    }
  };

  return (
    <div className="page" style={{ maxWidth: 480 }}>
      <h3 className="mb-3">Create Account</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" name="fullName" placeholder="Full name"
          value={form.fullName} onChange={change} required />
        <input className="form-control mb-3" name="username" placeholder="Username"
          value={form.username} onChange={change} required />
        <input className="form-control mb-3" type="email" name="email" placeholder="Email"
          value={form.email} onChange={change} required />
        <input className="form-control mb-3" type="password" name="password" placeholder="Password"
          value={form.password} onChange={change} required minLength={6} />
        <select className="form-select mb-3" name="role" value={form.role} onChange={change}>
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
        </select>
        <button className="btn btn-primary w-100">Sign Up</button>
      </form>
      <p className="mt-3">
        Already registered? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
};

export default SignUp;
