import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import LiveChat from "@/components/sections/LiveChat";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />

      {/* Offset for fixed navbar (TOP BAR + NAV BAR) */}
      <main className="flex-1 pt-[104px]">
        {children}
      </main>

      <PublicFooter />

      {/* LiveChat Component */}
      <LiveChat />
    </div>
  );
}