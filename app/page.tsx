import { Hero } from "@/components/component/hero";
import Navbar from "@/components/navbar";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
    </main>
  );
}
