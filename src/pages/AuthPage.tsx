import { Outlet } from "react-router";
export default function AuthPage() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <div className="w-100 h-120 m-auto bg-slate-200">
        <Outlet />
      </div>
    </div>
  );
}
