import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="page text-center">
    <h1 className="display-4">404</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" className="btn btn-primary">Back to home</Link>
  </div>
);

export default NotFound;
