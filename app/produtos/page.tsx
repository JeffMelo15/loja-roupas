"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { produtos } from "../data/produtos";

const categorias = [
  "Todos",
  "Camisetas",
  "Moletons",
  "Calças",
  "Jaquetas",
  "Bermudas",
  "Acessórios",
];

function converterPreco(preco: string) {
  return Number(preco.replace("R$ ", "").replace(".", "").replace(",", "."));
}

export default function ProdutosPage() {
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("padrao");

  const produtosFiltrados = produtos
    .filter((produto) => {
      const correspondeBusca = produto.nome
        .toLowerCase()
        .includes(busca.toLowerCase());

      const correspondeCategoria =
        categoriaSelecionada === "Todos" ||
        produto.categoria === categoriaSelecionada;

      return correspondeBusca && correspondeCategoria;
    })
    .sort((a, b) => {
      if (ordenacao === "menor-preco") {
        return converterPreco(a.preco) - converterPreco(b.preco);
      }

      if (ordenacao === "maior-preco") {
        return converterPreco(b.preco) - converterPreco(a.preco);
      }

      if (ordenacao === "az") {
        return a.nome.localeCompare(b.nome);
      }

      return 0;
    });

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-4 py-8 md:px-8 md:py-10">
        <a href="/" className="mb-6 inline-block rounded-lg border px-4 py-2">
          ← Voltar
        </a>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-4xl font-bold">Produtos</h1>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              placeholder="Buscar produto..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black md:w-72"
            />

            <select
              value={ordenacao}
              onChange={(event) => setOrdenacao(event.target.value)}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black md:w-56"
            >
              <option value="padrao">Ordenar</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
              <option value="az">Nome A-Z</option>
            </select>
          </div>
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaSelecionada(categoria)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                categoriaSelecionada === categoria
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {produtosFiltrados.length === 0 ? (
          <p className="text-gray-600">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {produtosFiltrados.map((produto) => (
              <ProductCard key={produto.slug} produto={produto} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}