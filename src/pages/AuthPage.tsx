import { Outlet } from "react-router";
export default function AuthPage() {
  return (
    <div className="flex flex-1 h-full min-w-screen items-center justify-center">
      <Outlet />
    </div>
  );
}
