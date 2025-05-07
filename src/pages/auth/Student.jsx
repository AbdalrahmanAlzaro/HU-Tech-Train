import React, { useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { GraduationCap, KeyRound, User, LogIn } from "lucide-react";

const Student = () => {
  const { login } = useAuth();
  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://railway-system-production-1a43.up.railway.app/api/auth/login/student",
        { universityId, password }
      );

      login(res.data.data); // set context + localStorage

      Swal.fire({
        title: "Success",
        text: "Logged in successfully!",
        icon: "success",
        confirmButtonColor: "#dc2626", // red-600 instead of amber
      });
    } catch (err) {
      Swal.fire({
        title: "Login Failed",
        text: err.response?.data?.message || err.message,
        icon: "error",
        confirmButtonColor: "#dc2626", // red-600
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-2 bg-red-100 rounded-full mb-4">
          <GraduationCap className="text-red-600" size={28} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Student Login</h1>
        <p className="text-gray-500 mt-2">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* University ID Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="University ID"
            value={universityId}
            onChange={(e) => setUniversityId(e.target.value)}
            className="pl-10 border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <KeyRound className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white w-full px-4 py-3 rounded-md flex items-center justify-center transition-colors"
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Logging in...
            </span>
          ) : (
            <>
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Student;
