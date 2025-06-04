import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

function LoginPage() {
  const { signInUser, isLoading, setIsLoading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const userCredential = await signInUser(email, password);
      const user = userCredential.user;

      console.log("✅ User login:", user);
      toast.success("User login successfully!");
      // ✅ Optional: Navigate to dashboard or homepage
    } catch (error) {
      console.error("❌ Login failed:", error.message);
      toast.error(error.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-[var(--color-card)] p-8 rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-[var(--color-accent)]">
          Login to your account
        </h2>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm text-[var(--color-accent)]">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 rounded-md bg-transparent border border-[var(--color-border-color)] text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-sm text-[var(--color-accent)]"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 rounded-md bg-transparent border border-[var(--color-border-color)] text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <input
          type="submit"
          value={isLoading ? "Logging in..." : "Login"}
          disabled={isLoading}
          className="w-full py-2 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-cta-active)] cursor-pointer transition"
        />
      </form>
    </section>
  );
}

export default LoginPage;
