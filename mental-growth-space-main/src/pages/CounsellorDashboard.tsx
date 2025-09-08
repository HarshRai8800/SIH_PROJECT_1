// src/pages/CounsellorDashboard.tsx
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CounsellorFormData = {
  fullName: string;
  email: string;
  specialization: string;
  experience: number;
};

const CounsellorDashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CounsellorFormData>();

  const onSubmit = (data: CounsellorFormData) => {
    console.log("Counsellor Data:", data);
    // Replace this with your API call
    alert("Form submitted successfully!");
    reset(); // optional: clear form after submission
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-background">
      <h1 className="text-3xl font-bold mb-6">Counsellor Dashboard</h1>

      <div className="w-full max-w-lg bg-card p-6 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium mb-1">Specialization</label>
            <Input
              type="text"
              placeholder="Enter your specialization"
              {...register("specialization", { required: "Specialization is required" })}
            />
            {errors.specialization && (
              <p className="text-red-500 text-sm">{errors.specialization.message}</p>
            )}
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-sm font-medium mb-1">Years of Experience</label>
            <Input
              type="number"
              placeholder="Enter years of experience"
              {...register("experience", { required: "Experience is required", min: 0 })}
            />
            {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
          </div>

          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CounsellorDashboard;
