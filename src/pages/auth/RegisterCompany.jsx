import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import Swal from "sweetalert2";
import {
  Building2,
  User,
  Phone,
  MapPin,
  Briefcase,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";

const RegisterCompany = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    nationalId: "",
    name: "",
    phone: "",
    location: "",
    fieldOfWork: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.nationalId) {
      setFormData((prev) => ({
        ...prev,
        nationalId: location.state.nationalId,
      }));
    }
  }, [location.state]);

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
    if (!formData.name.trim()) newErrors.name = "Company name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.fieldOfWork.trim())
      newErrors.fieldOfWork = "Field of work is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
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
        "https://railway-system-production-1a43.up.railway.app/api/auth/register/company",
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
        throw new Error(data.message || "Registration failed");
      }

      login(data.data);

      Swal.fire({
        icon: "success",
        title: "Registration Complete",
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
      setErrors((prev) => ({ ...prev, form: err.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <div className="flex items-center mb-6">
        <Building2 className="h-8 w-8 text-red-600 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">
          Register Your Company
        </h1>
      </div>

      {errors.form && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-600 rounded-lg">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
        {/* National ID */}
        <div className="relative">
          <User className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
          <input
            type="text"
            name="nationalId"
            placeholder="National ID"
            value={formData.nationalId}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border ${
              errors.nationalId ? "border-red-600" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
            required
          />
          {errors.nationalId && (
            <p className="text-red-600 text-xs mt-1">{errors.nationalId}</p>
          )}
        </div>

        {/* Company Name */}
        <div className="relative">
          <Building2 className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border ${
              errors.name ? "border-red-600" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
            required
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="relative">
          <Phone className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border ${
              errors.phone ? "border-red-600" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
            required
          />
          {errors.phone && (
            <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border ${
              errors.location ? "border-red-600" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
            required
          />
          {errors.location && (
            <p className="text-red-600 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        {/* Field of Work */}
        <div className="relative">
          <Briefcase className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
          <input
            type="text"
            name="fieldOfWork"
            placeholder="Field of Work"
            value={formData.fieldOfWork}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border ${
              errors.fieldOfWork ? "border-red-600" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
            required
          />
          {errors.fieldOfWork && (
            <p className="text-red-600 text-xs mt-1">{errors.fieldOfWork}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border ${
              errors.email ? "border-red-600" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
            required
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            className={`w-full pl-10 pr-3 py-2 border ${
              errors.password ? "border-red-600" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600`}
            required
          />
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center justify-center font-medium ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Registering...
            </>
          ) : (
            "Register Company"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-500 text-sm">
        Already have an account?
        <a
          href="/login/company"
          className="ml-1 text-red-600 hover:underline cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Log in
        </a>
      </p>
    </div>
  );
};

export default RegisterCompany;
