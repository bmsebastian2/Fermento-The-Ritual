import { Nav } from "@/components/nav/nav";
import { CategoryNav } from "@/components/nav/category-nav";
import { Hero } from "@/components/hero/hero";
import { LineSection } from "@/components/product-grid/line-section";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ProductDetailProvider } from "@/components/product-detail/product-detail-provider";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";

export default function Home() {
  return (
    // El pedido envuelve toda la página porque sus dos extremos están lejos:
    // el contador vive en el Nav y los "Agregar" en el catálogo.
    // Nav, Hero y LineSection siguen siendo server components: se crean acá y
    // llegan al provider como `children`, y eso no los vuelve client.
    <CartProvider>
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
      <CartDrawer />
    </CartProvider>
  );
}
