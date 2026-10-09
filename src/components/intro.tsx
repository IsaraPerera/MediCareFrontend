
import { Link } from "react-router-dom";
import { useAuth } from "../libs/AuthContext";

const Intro = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-copy">
          <div className="section-eyebrow">
            Your health, thoughtfully supported
          </div>

          <h1>
            Care that puts <span>you first.</span>
          </h1>

          <p>
            Find trusted doctors, book appointments with confidence, and keep
            your care journey organised in one simple place.
          </p>

          {isAuthenticated ? (
            <>
              <p>
                Welcome back, <strong>{user?.fullName}</strong>. What can we
                help you with today?
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Link to="/doctors" className="btn btn-primary">
                  Find a doctor →
                </Link>
                <Link to="/appointments" className="btn btn-outline-primary">
                  View appointments
                </Link>
              </div>
            </>
          ) : (
            <div className="d-flex flex-wrap gap-2">
              <Link to="/signup" className="btn btn-primary">
                Create your account →
              </Link>
              <Link to="/signin" className="btn btn-outline-primary">
                Sign in
              </Link>
            </div>
          )}

          <div className="d-flex flex-wrap gap-3 mt-4 form-hint">
            <span>✓ Easy appointment booking</span>
            <span>✓ Care details in one place</span>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-illustration">
            <div className="hero-cross">✚</div>
            <div className="floating-note note-one">
              Care, made simpler
              <small>Your health journey</small>
            </div>
            <div className="floating-note note-two">
              ♥ Patient first
              <small>Support at every step</small>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <div className="feature-icon">⌕</div>
          <div>
            <h3>Find the right doctor</h3>
            <p>Explore specialties and choose a doctor who fits your needs.</p>
          </div>
        </article>

        <article className="feature-card">
          <div className="feature-icon">▦</div>
          <div>
            <h3>Book with ease</h3>
            <p>View available time slots and manage your appointments.</p>
          </div>
        </article>

        <article className="feature-card">
          <div className="feature-icon">♡</div>
          <div>
            <h3>Keep care organised</h3>
            <p>Access your appointments and prescriptions in one place.</p>
          </div>
        </article>
      </section>

      <p className="footer-note">
        MediCare · A clearer, calmer way to manage healthcare
      </p>
    </main>
  );
};

export default Intro;