import ChatUI from "@/components/chat_ui/ChatUI";

export default function Home() {
  return (
    <main className="">
      <div
        className="fixed top-0 left-0 h-screen w-screen z-10"
        style={{ backgroundImage: "url('/Home.png')", backgroundSize: "cover" }}
      ></div>
      <ChatUI className="absolute z-20 bottom-2 right-2 bg-white" />
    </main>
  );
}
