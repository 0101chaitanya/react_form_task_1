import { useState } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      age: "",
    },
  });

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };

  return (
    <div className="mx-auto mt-12 max-w-md rounded-xl bg-white p-6 shadow-md border border-slate-100">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">User Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Age Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="age" className="text-sm font-medium text-slate-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            {...register("age", {
              required: "Age is required",
              min: { value: 1, message: "Age must be greater than 0" },
            })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.age && (
            <span className="text-xs text-red-500">{errors.age.message}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer rounded-lg bg-slate-500 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      <hr className="my-6 border-slate-200" />

      {/* Conditional Rendering Block */}
      {submittedData ? (
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-emerald-900">
            Submitted User Details:
          </h3>
          <div className="space-y-1 text-sm text-emerald-800">
            <p>
              <strong>Name:</strong> {submittedData.name}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
            <p>
              <strong>Age:</strong> {submittedData.age}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-sm italic text-slate-400">
          No user data submitted yet
        </p>
      )}
    </div>
  );
}
