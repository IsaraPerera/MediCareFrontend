# MediCare Frontend

React + TypeScript frontend for the MediCare doctor appointment system. It talks to a Spring Boot + JWT + MySQL backend.

## Features

- Sign up / sign in with JWT (roles: ADMIN, DOCTOR, PATIENT, RECEPTIONIST, LAB_TECHNICIAN)
- Browse and search doctors
- Book appointments by picking a date and an available slot
- Doctors confirm or cancel appointments, patients cancel their own
- Doctors record consultations
- Patients view prescriptions
- Profile view and edit

## Getting started

```bash
npm install
npm start
```

The app runs on http://localhost:3000.

Set the backend URL in `.env`:

```
REACT_APP_API_URL=http://localhost:8080/api/v1
```

## Project structure

```
src/
  components/
    auth/          SignIn, SignUp
    navbar/        NavBar
    Doctor/        DoctorView
    Appointment/   BookAppointment, AppointmentView
    Consultation/  ConsultationView
    Prescription/  PrescriptionView
    User/          UserView, UserEdit
    other/         NotFound
    intro.tsx      Home page
  libs/            axios instance, AuthContext, ProtectedRoute, API services
  models/          TypeScript interfaces
  App.tsx          Routes
  index.tsx        Entry point
```

## Expected backend endpoints

| Method | Endpoint |
| --- | --- |
| POST | /auth/register, /auth/login |
| GET | /doctors, /doctors/{id}, /doctors/{id}/slots?date= |
| POST | /appointments |
| GET | /doctors/{id}/appointments, /patients/{id}/appointments |
| PUT | /appointments/{id}/confirm, /cancel, /reschedule |
| POST | /consultations, /prescriptions |
| GET | /patients/{id}/prescriptions, /patients/{id}/consultations |
| PUT | /users/{id} |

Adjust the paths in `src/libs/*Service.ts` if your backend differs.
