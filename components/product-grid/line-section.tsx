import type { Line } from "@/lib/data/products";
import { lines, categoriesByLine } from "@/lib/data/products";
import { ProductGrid } from "@/components/product-grid/product-grid";
import { StampLabel } from "@/components/ui/stamp-label";
import { Reveal } from "@/components/ui/reveal";

/** Sección de una línea de producto (Fermento o The Ritual). */
export function LineSection({ id, line }: { id: string; line: Line }) {
  const meta = lines.find((l) => l.id === line);
  const cats = categoriesByLine(line);
  if (!meta) return null;

  return (
    <section id={id} className="scroll-mt-24 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <header className="max-w-2xl">
            <StampLabel align="left">Línea {meta.name}</StampLabel>
            <h2 className="mt-5 font-display text-5xl text-forest lg:text-6xl">
              {meta.name}
            </h2>
            <p className="mt-4 text-lg text-ink/75">{meta.tagline}</p>
          </header>
        </Reveal>

        {cats.map((cat) => (
          <ProductGrid key={cat.id} categoryId={cat.id} />
        ))}
      </div>
    </section>
  );
}
