import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import AuthPage from "./pages/AuthPage";
import LoginForm from "./components/form/LoginForm";
import SignupForm from "./components/form/SignupForm";
import ForgotPasswordForm from "./components/form/ForgotPasswordForm";
import ResetPasswordForm from "./components/form/ResetPasswordForm";
import EmailVerificationForm from "./components/form/EmailVerificationForm";
import LoadingOverlay from "./components/LoadingOverlay";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <LoadingOverlay />
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <div className="flex-1 h-full flex flex-col">
          <Routes>
            <Route path="/auth" element={<AuthPage />}>
              <Route
                index
                path="/auth"
                element={<Navigate to="/auth/login" replace />}
              />
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/auth/signup" element={<SignupForm />} />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPasswordForm />}
              />
              <Route
                path="/auth/reset-password"
                element={<ResetPasswordForm />}
              />
              <Route
                path="/auth/verify-email"
                element={<EmailVerificationForm />}
              />
            </Route>
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
