import { ProfessionalNavbar } from "@/components/navigation/ProfessionalNavbar";
import { Outlet } from "react-router-dom";

export default function ProfessionalLayout() {
  return (
    <div className="flex flex-col h-screen bg-muted">
      <ProfessionalNavbar />

      <main className="flex-1 overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
