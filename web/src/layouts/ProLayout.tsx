import { ProNavbar } from "@/components/layout/ProNavbar";
import { Outlet } from "react-router-dom";

export default function ProLayout() {
  return (
    <div className="flex flex-col h-screen bg-muted">
      <main className="flex-1 overflow-auto p-4">
        <Outlet />
      </main>

      <ProNavbar />
    </div>
  );
}
