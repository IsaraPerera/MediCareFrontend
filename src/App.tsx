import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Intro from "./components/intro";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import NotFound from "./components/other/NotFound";
import UserView from "./components/User/UserView";
import UserEdit from "./components/User/UserEdit";
import DoctorView from "./components/Doctor/DoctorView";
import DoctorProfileEdit from "./components/Doctor/DoctorProfileEdit";
import BookAppointment from "./components/Appointment/BookAppointment";
import AppointmentView from "./components/Appointment/AppointmentView";
import ConsultationView from "./components/Consultation/ConsultationView";
import PrescriptionView from "./components/Prescription/PrescriptionView";
import ProtectedRoute from "./libs/ProtectedRoute";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/profile" element={<ProtectedRoute><UserView /></ProtectedRoute>} />
        <Route path="/profile/edit" element={<ProtectedRoute><UserEdit /></ProtectedRoute>} />

        <Route path="/doctors" element={<ProtectedRoute><DoctorView /></ProtectedRoute>} />
        <Route path="/doctor/settings"
          element={<ProtectedRoute roles={["DOCTOR"]}><DoctorProfileEdit /></ProtectedRoute>} />

        <Route path="/doctors/:doctorId/book"
          element={<ProtectedRoute roles={["PATIENT", "RECEPTIONIST"]}><BookAppointment /></ProtectedRoute>} />

        <Route path="/appointments" element={<ProtectedRoute><AppointmentView /></ProtectedRoute>} />
        <Route path="/consultations"
          element={<ProtectedRoute roles={["DOCTOR"]}><ConsultationView /></ProtectedRoute>} />
        <Route path="/prescriptions" element={<ProtectedRoute><PrescriptionView /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;