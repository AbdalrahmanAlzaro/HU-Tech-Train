import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import Swal from "sweetalert2";
import { Building, Lock, Loader2 } from "lucide-react";

const Company = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nationalId: "",
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

      // Save token and user to context/localStorage
      login(data.data);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
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
            <div className="text-red-600 text-xs mt-1">{errors.nationalId}</div>
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
          <div className="text-sm">
            <a href="#" className="font-medium text-red-600 hover:text-red-500">
              Forgot password?
            </a>
          </div>
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

export default Company;
