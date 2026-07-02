import { Nav } from "@/components/nav/nav";
import { Hero } from "@/components/hero/hero";
import { LineSection } from "@/components/product-grid/line-section";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ProductDetailProvider } from "@/components/product-detail/product-detail-provider";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <ProductDetailProvider>
          <LineSection id="fermento" line="fermento" />
          <LineSection id="the-ritual" line="ritual" />
        </ProductDetailProvider>
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
