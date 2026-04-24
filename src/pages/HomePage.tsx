import { Outlet } from "react-router";
export default function HomePage() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}
