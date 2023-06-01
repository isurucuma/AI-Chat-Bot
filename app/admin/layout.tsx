import NavBar from "@/components/page_items/NavBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <NavBar className="flex-initial bg-green-200" />
      <div className="flex-1 bg-yellow-200">{children}</div>
    </div>
  );
}
