import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [nationalId, setNationalId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!nationalId.trim()) {
      setError("Please enter a National ID");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://railway-system-production-1a43.up.railway.app/api/auth/verify-company/${nationalId}`
      );

      if (!response.ok) {
        throw new Error("Company not found or invalid ID");
      }

      const data = await response.json();

      setError("");

      // ✅ Show success alert
      Swal.fire({
        icon: "success",
        title: "Company Verified",
        text: "Verification successful. Proceeding to registration...",
        timer: 2000,
        showConfirmButton: false,
      });

      // ✅ Navigate after delay
      setTimeout(() => {
        navigate("/register/company", { state: { nationalId } });
      }, 2000);
    } catch (err) {
      setError(err.message || "Company not found or invalid ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
        Company Registration
      </h1>

      <div className="mb-6">
        <label
          htmlFor="nationalId"
          className="block mb-2 font-medium text-gray-500"
        >
          National ID
        </label>
        <div className="flex gap-2">
          <input
            id="nationalId"
            type="text"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            placeholder="Enter National ID"
            className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          />
          <button
            onClick={handleVerify}
            disabled={loading}
            className={`bg-red-600 text-white px-4 py-2 rounded font-medium transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Verifying
              </span>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 border border-red-200 rounded bg-red-50 text-red-600">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500 mt-4">
        For assistance, please contact support at support@company.com
      </div>
    </div>
  );
};

export default Verify;
