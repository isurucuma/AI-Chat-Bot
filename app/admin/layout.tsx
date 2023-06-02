import NavBar from "@/components/page_items/NavBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <NavBar className="flex-initial px-14 pt-3" />
      <div className="flex-1 mx-10">{children}</div>
    </div>
  );
}
