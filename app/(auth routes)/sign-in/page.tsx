"use client";
import css from "./SignInPage.module.css";
import { login } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const SignInPage = () => {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await login({ email, password });
      if (user) {
        setUser(user);
        router.push("/profile");
      } else {
        console.error("Login failed: No user returned");
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