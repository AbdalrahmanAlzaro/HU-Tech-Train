import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext"; // adjust path if needed
import Swal from "sweetalert2";
import { Mail, Lock, Loader2 } from "lucide-react";

const Department = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (!formData.email.trim()) newErrors.email = "Email is required";
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
        "https://railway-system-production-1a43.up.railway.app/api/auth/login/department-head",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      login(data.data);

      Swal.fire({
        icon: "success",
        title: "Logged In",
        text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
        Department Head Login
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <Mail className="absolute left-3 top-2.5 text-gray-500" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border ${
              errors.email ? "border-red-600" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
          />
          {errors.email && (
            <div className="text-red-600 text-xs mt-1">{errors.email}</div>
          )}
        </div>

        <div className="mb-4 relative">
          <Lock className="absolute left-3 top-2.5 text-gray-500" />
          <input
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
  );
};

export default Department;
