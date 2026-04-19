"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";

function EditProfilePage() { 
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const [user, setLocalUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getMe();
        setLocalUser(data);
        setUsername(data.username);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedUser = await updateMe({ username });

      setUser(updatedUser);

      router.push("/profile");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) return <p>Loading...</p>;

    return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image
              src="https://ac.goit.global/fullstack/react/avatar-default.jpg"
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />

    <form className={css.profileInfo} onSubmit={handleSubmit}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          className={css.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <p>Email: {user?.email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
    )
}
export default EditProfilePage;