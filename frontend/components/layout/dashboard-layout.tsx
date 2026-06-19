import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Footer from "./footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-8 text-slate-900">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}