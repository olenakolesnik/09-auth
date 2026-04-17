"use client";
import css from "./SignUpPage.module.css";
import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
const SignUpPage = () => {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await register({ email, password });
      if (user) {
        setUser(user);
        router.push("/profile");
      } else {
        console.error("Registration failed: No user returned");
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