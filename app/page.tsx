import { Nav } from "@/components/nav/nav";
import { Hero } from "@/components/hero/hero";
import { LineSection } from "@/components/product-grid/line-section";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <LineSection id="fermento" line="fermento" />
        <LineSection id="the-ritual" line="ritual" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
