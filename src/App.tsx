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
import Footer from "./components/Footer";
import ContactUsPage from "./pages/ContactUsPage";
import ListingPage from "./pages/ListingPage";
import AboutUsPage from "./pages/AboutUsPage";
import ProductPage from "./pages/ProductPage";
function App() {
  return (
    <>
      <LoadingOverlay />
      <div className="flex flex-col min-h-screen px-10">
        <div className="sticky top-0 z-1000">
          <Navbar />
        </div>
        <div className="flex-1 h-full flex flex-col p-5">
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
            <Route path="/products" element={<ListingPage />} />
            <Route path="/product/:id" element={<ProductPage />} />

            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
          </Routes>
        </div>
        <div className="mt-5">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
