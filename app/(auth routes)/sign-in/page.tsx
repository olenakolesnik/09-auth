"use client";
import css from "./SignInPage.module.css";
import { login } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await login({ email, password });
router.push("/profile");
      if (!res) {
        throw new Error("Failed to log in");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }
    return (
        <main className={css.mainContent}>
        <form className={css.form} action={handleSubmit}>
           <h1 className={css.formTitle}>Sign in</h1>
       
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
               Log in
             </button>
           </div>
       
           <p className={css.error}>Error</p>
         </form>
       </main>
    )
}
export default SignInPage;