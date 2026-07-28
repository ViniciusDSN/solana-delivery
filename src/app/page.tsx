import { DeliveryApp } from "@/components/DeliveryApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="mx-auto max-w-4xl px-5 pb-20">
          <DeliveryApp />
        </section>
      </main>
      <Footer />
    </div>
  );
}
