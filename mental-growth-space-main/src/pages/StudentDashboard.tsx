// src/pages/StudentDashboard.tsx
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StudentFormData = {
  fullName: string;
  email: string;
  course: string;
  age: number;
};

const StudentDashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentFormData>();

  const onSubmit = (data: StudentFormData) => {
    console.log("Student Data:", data);
    // Here you can send it to backend using fetch/axios
    alert("Form submitted successfully!");
    reset(); // optional: clear the form after submission
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-background">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

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

          {/* Course */}
          <div>
            <label className="block text-sm font-medium mb-1">Course / Program</label>
            <Input
              type="text"
              placeholder="Enter your course"
              {...register("course", { required: "Course is required" })}
            />
            {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <Input
              type="number"
              placeholder="Enter your age"
              {...register("age", { required: "Age is required", min: 1 })}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>

          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StudentDashboard;
