import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  type Inputs = {
    name: string;
    email: string;
    password: string;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password } = data;
    try {
      console.log(name, email, password);
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed yes");
      }
      console.log("Sign-up successful");
      const responsedata = await response.json();

      localStorage.setItem("authToken", responsedata.auth_token);
      localStorage.setItem("userData", JSON.stringify(responsedata.user));

      navigate("/account");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.name ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
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
          Sign up
        </button>
      </form>
      <a
        href="/signin"
        className=" mt-6 text-black-500  hover:underline hover:text-red-400"
      >
        Already have an account?SignIn.
      </a>
    </div>
  );
};

export default SignupForm;
