import { Navbar } from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <Navbar />

      <main className="flex-1 w-full">
        <div className="px-4 py-6 mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
