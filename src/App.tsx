import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import AuthPage from "./pages/AuthPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import EmailVerificationForm from "./components/EmailVerificationForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />}>
          <Route index path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/signup" element={<SignupForm />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordForm />}
          />
          <Route path="/auth/reset-password" element={<ResetPasswordForm />} />
          <Route
            path="/auth/email-verification"
            element={<EmailVerificationForm />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
