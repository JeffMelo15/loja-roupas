"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { Produto } from "../data/produtos";

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  useEffect(() => {
    const favoritosSalvos = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

    setFavoritos(favoritosSalvos);
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="px-4 py-10 md:px-8">
        <a href="/produtos" className="mb-6 inline-block rounded-lg border px-4 py-2">
          ← Ver produtos
        </a>

        <h1 className="mb-8 text-4xl font-bold">Favoritos</h1>

        {favoritos.length === 0 ? (
          <p className="text-gray-600">
            Você ainda não favoritou nenhum produto.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoritos.map((produto) => (
              <ProductCard key={produto.slug} produto={produto} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}