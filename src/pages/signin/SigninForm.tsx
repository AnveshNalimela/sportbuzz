import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { withHandleSubmit } from "../../decorators/handleSubmit";
import { withLog } from "../../decorators/log";

interface Inputs {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      console.log("Sign-in successful");
      const responseData = await response.json();

      localStorage.setItem("authToken", responseData.auth_token);
      localStorage.setItem("userData", JSON.stringify(responseData.user));
      navigate("/account");
    } catch (error) {
      console.error("Sign-in failed:", error);
      setMsg("Sign-in failed: Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit(withHandleSubmit(withLog(onSubmit)))}>
      <div className="text-red-500 text-sm font-medium text-center my-3">
        {msg}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.email ? "border-red-500" : ""
          }`}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.password ? "border-red-500" : ""
          }`}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign In
      </button>
      <a
        href="/signup"
        className=" mt-6 text-black-500  hover:underline hover:text-red-400"
      >
        Don't have an account? Create an account.
      </a>
    </form>
  );
};

export default SigninForm;
