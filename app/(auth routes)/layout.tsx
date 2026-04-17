import { useAuthStore } from "@/lib/store/authStore";


export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return (
      <div>
        {isAuthenticated ? children : <p>Please log in to access this content.</p>}
      </div>
    );
  }