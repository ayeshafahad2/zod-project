import { useForm } from "react-hook-form";
import FormField from "./FormFeild";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, UserSchema, ValidFieldNames } from "../../../types";
import axios from "axios";
import React, { useState } from "react";
import Confetti from "react-confetti";

function Form() {
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/form", data); // Make a POST request
      const { errors: serverErrors = {} } = response.data; // Destructure the 'errors' property from the response data

      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        email: "email",
        githubUrl: "githubUrl",
        yearsOfExperience: "yearsOfExperience",
        password: "password",
        confirmPassword: "confirmPassword",
      };

      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => serverErrors[field]
      );

      if (fieldWithError) {
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: serverErrors[fieldWithError],
        });
      } else {
        // If no errors, show confetti and success alert
        setShowConfetti(true);
        alert("Form submitted successfully!");
        setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
      }
    } catch (error) {
      alert("Submitting form failed!");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center   bg-center p-4"
      style={{
        backgroundImage:
          "url('background.jpg')", // Replace with your desired image URL
      }}
    >
      {showConfetti && <Confetti />} {/* Render confetti conditionally */}
      <form
  onSubmit={handleSubmit(onSubmit)}
  className="
    w-full 
    max-w-lg 
    bg-transparent 
    bg-opacity-90 
    p-4 
    sm:p-6 
    lg:p-8 
    rounded-lg 
    shadow-lg 
    flex 
    flex-col 
    justify-center 
    items-center 
    mx-auto 
    transition-all 
    duration-300 
  "
>
  <h1
    className="
      text-xl 
      sm:text-2xl 
      lg:text-3xl 
      font-bold 
      mb-4 
      sm:mb-6 
      text-center 
      text-amber-900 
      tracking-wide 
    "
  >
    Zod & React-Hook-Form
  </h1>
        <FormField
          type="email"
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email}
        />

        <FormField
          type="text"
          placeholder="GitHub URL"
          name="githubUrl"
          register={register}
          error={errors.githubUrl}
        />

        <FormField
          type="number"
          placeholder="Years of Experience (1 - 10)"
          name="yearsOfExperience"
          register={register}
          error={errors.yearsOfExperience}
          valueAsNumber
        />

        <FormField
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password}
        />

        <FormField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
        />
        <button
          type="submit"
          className="w-full bg-amber-950 text-white py-2 px-4 rounded-md hover:bg-amber-400 transition mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
