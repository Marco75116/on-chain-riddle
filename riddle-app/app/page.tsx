import Header from "@/components/header/header";
import Riddle from "@/components/riddle";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <Riddle />
      </div>
    </div>
  );
}
