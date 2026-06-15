"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PromoBar from "./components/PromoBar";
import ProductCard from "./components/ProductCard";
import { Produto } from "./data/produtos";
import { getProdutos } from "./data/getProdutos";

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    setProdutos(getProdutos());
  }, []);

  const produtosEmDestaque = produtos.filter((produto) => produto.destaque);

  return (
    <main className="min-h-screen bg-white text-black">
      <PromoBar />
      <Header />

      <section className="px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 rounded-3xl bg-gray-100 px-6 py-12 md:grid-cols-2 md:px-10">
          <div>
            <span className="mb-4 inline-block rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
              Nova coleção
            </span>

            <h1 className="mb-4 text-4xl font-black leading-tight md:text-6xl">
              Estilo urbano para o seu dia a dia
            </h1>

            <p className="mb-8 text-gray-600 md:text-lg">
              Peças modernas, confortáveis e prontas para combinar com qualquer
              ocasião.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/produtos"
                className="rounded-lg bg-black px-6 py-3 text-center font-medium text-white transition hover:bg-gray-800"
              >
                Ver catálogo
              </a>

              <a
                href="#destaques"
                className="rounded-lg border px-6 py-3 text-center font-medium transition hover:bg-white"
              >
                Ver destaques
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {produtosEmDestaque.slice(0, 4).map((produto) => (
              <div key={produto.slug} className="overflow-hidden rounded-2xl bg-white">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="h-40 w-full object-cover md:h-56"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="destaques" className="px-4 py-12 md:px-8">
        <h3 className="mb-8 text-center text-3xl font-bold">
          Produtos em Destaque
        </h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produtosEmDestaque.map((produto) => (
            <ProductCard key={produto.slug} produto={produto} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}