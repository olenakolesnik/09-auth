"use client";
import css from "./SignUpPage.module.css";
import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await register({ email, password });
router.push("/profile");
      if (!res) {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
    return (
        <main className={css.mainContent}>
        <h1 className={css.formTitle}>Sign up</h1>
          <form action={handleSubmit} className={css.form} >
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" className={css.input} required />
          </div>
      
          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" className={css.input} required />
          </div>
      
          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Register
            </button>
          </div>
      
          <p className={css.error}>Error</p>
        </form>
        </main>
    )
}
export default SignUpPage;