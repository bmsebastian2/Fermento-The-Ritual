import { Nav } from "@/components/nav/nav";
import { CategoryNav } from "@/components/nav/category-nav";
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
        {/* Zona de catálogo: la barra de categorías es sticky solo aquí. */}
        <div>
          <CategoryNav />
          <ProductDetailProvider>
            <LineSection id="fermento" line="fermento" />
            <LineSection id="the-ritual" line="ritual" />
          </ProductDetailProvider>
        </div>
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
