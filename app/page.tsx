import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import { produtos } from "./data/produtos";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="px-4 py-16 text-center md:px-8 md:py-20">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">
          Vista seu estilo
        </h2>

        <p className="mb-8 text-gray-600">
          Roupas modernas, confortáveis e com preço justo.
        </p>

        <a
          href="/produtos"
          className="inline-block rounded-lg bg-black px-6 py-3 text-white"
        >
          Ver produtos
        </a>
      </section>

      <section className="px-4 py-12 md:px-8">
        <h3 className="mb-8 text-center text-3xl font-bold">
          Produtos em Destaque
        </h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produtos
  .filter((produto) => produto.destaque)
  .map((produto) => (
            <ProductCard key={produto.slug} produto={produto} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}