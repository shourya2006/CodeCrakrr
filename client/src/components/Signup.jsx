import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Static/logo.png";
import { AuthContext } from "../context/AuthContext";
import { HandleContext } from "../context/HandleContext";
const Signup = () => {
  const { setToken } = useContext(AuthContext);
  const { handle } = useContext(HandleContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (
      data.error &&
      data.error.includes(
        "E11000 duplicate key error collection: SolveIQ.users index: email_1 dup key:"
      )
    ) {
      alert("Email already exists");
      return;
    }
    if (data.errors) {
      alert(data.errors[0].msg);
      return;
    }
    if (response.ok) {
      console.log("Data submitted successfully!");
      setToken(data.authToken);
      localStorage.clear();
      navigate(!handle ? "/settings" : "/codeforces");
    } else {
      alert("server error. Refresh the page and try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="mb-5">
              <img
                src={logo}
                alt="SolveIQ Logo"
                className="h-14 w-14 rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Create account
            </h2>
            <p className="mt-1 text-sm text-gray-500">Join SolveIQ today</p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => handleSubmit(e)}
            method="POST"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                placeholder="yourname@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md cursor-pointer text-white font-medium bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
