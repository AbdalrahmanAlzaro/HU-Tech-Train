import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { Building, Lock, Loader2, X } from "lucide-react";
import Swal from "sweetalert2";

const Company = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nationalId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nationalId.trim())
      newErrors.nationalId = "National ID is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://railway-system-production-1a43.up.railway.app/api/auth/login/company",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.data);

      Swal.fire({
        title: "Success",
        text: "Logged in successfully!",
        icon: "success",
        confirmButtonColor: "#dc2626",
      });
      navigate("/dashboard/comapny");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");
    setForgotLoading(true);

    try {
      const response = await fetch(
        "https://railway-system-production-1a43.up.railway.app/api/auth/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: forgotEmail }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setForgotSuccess("Check your inbox for reset instructions.");
      setForgotEmail("");
    } catch (err) {
      setForgotError(err.message);
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <>
      {/* Main Login Form */}
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
          Company Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <Building className="absolute left-3 top-2.5 text-gray-500" />
            <input
              id="nationalId"
              type="text"
              name="nationalId"
              placeholder="National ID"
              value={formData.nationalId}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.nationalId ? "border-red-600" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
            />
            {errors.nationalId && (
              <div className="text-red-600 text-xs mt-1">
                {errors.nationalId}
              </div>
            )}
          </div>

          <div className="mb-4 relative">
            <Lock className="absolute left-3 top-2.5 text-gray-500" />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.password ? "border-red-600" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
            />
            {errors.password && (
              <div className="text-red-600 text-xs mt-1">{errors.password}</div>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            } flex justify-center items-center`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      {/* Custom Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setForgotEmail("");
                setForgotError("");
                setForgotSuccess("");
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Reset Your Password
            </h3>
            <form onSubmit={handleForgotPasswordSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {forgotError && (
                <p className="text-red-600 text-sm mb-2">{forgotError}</p>
              )}
              {forgotSuccess && (
                <p className="text-green-600 text-sm mb-2">{forgotSuccess}</p>
              )}
              <button
                type="submit"
                disabled={forgotLoading}
                className={`w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition ${
                  forgotLoading ? "opacity-70 cursor-not-allowed" : ""
                } flex justify-center items-center`}
              >
                {forgotLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Company;
