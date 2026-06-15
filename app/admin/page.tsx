"use client";

import { useEffect, useState } from "react";
import { Produto } from "../data/produtos";
import { getProdutos } from "../data/getProdutos";

export default function AdminPage() {
  const [carregando, setCarregando] = useState(true);
  const [produtosAdmin, setProdutosAdmin] = useState<Produto[]>([]);

  useEffect(() => {
    const adminLogado = localStorage.getItem("adminLogado");

    if (adminLogado !== "true") {
      window.location.href = "/admin/login";
      return;
    }

    setProdutosAdmin(getProdutos());
    setCarregando(false);
  }, []);

  function sair() {
    localStorage.removeItem("adminLogado");
    window.location.href = "/admin/login";
  }

  if (carregando) {
    return <main className="p-8">Carregando...</main>;
  }

  const totalProdutos = produtosAdmin.length;

  const emEstoque = produtosAdmin.filter(
    (produto) => produto.estoque > 0
  ).length;

  const semEstoque = produtosAdmin.filter(
    (produto) => produto.estoque <= 0
  ).length;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 text-black md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="/"
              className="mb-3 inline-block rounded-lg border px-4 py-2 text-sm transition hover:bg-white"
            >
              ← Voltar para a loja
            </a>

            <h1 className="text-4xl font-bold">Painel Admin</h1>
            <p className="text-gray-600">Gerencie os produtos da loja.</p>
          </div>

          <button
            onClick={sair}
            className="rounded-lg border px-4 py-2 transition hover:bg-white"
          >
            Sair
          </button>
        </div>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-medium text-gray-500">
              Total de produtos
            </h2>
            <p className="mt-2 text-3xl font-bold">{totalProdutos}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-medium text-gray-500">
              Produtos em estoque
            </h2>
            <p className="mt-2 text-3xl font-bold">{emEstoque}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-medium text-gray-500">Sem estoque</h2>
            <p className="mt-2 text-3xl font-bold">{semEstoque}</p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Produtos</h2>

            <button className="rounded-lg bg-black px-4 py-2 text-white">
              + Novo Produto
            </button>
          </div>

          <div className="space-y-4">
            {produtosAdmin.map((produto) => (
              <div
                key={produto.slug}
                className="flex flex-col gap-4 rounded-xl border p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">{produto.nome}</h3>
                    <p className="text-sm text-gray-500">
                      {produto.categoria}
                    </p>
                    <p className="font-medium">{produto.preco}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      produto.estoque > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {produto.estoque > 0
                      ? `Estoque: ${produto.estoque}`
                      : "Sem estoque"}
                  </span>

                  <a
                    href={`/admin/produtos/${produto.slug}`}
                    className="rounded-lg border px-4 py-2"
                  >
                    Editar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}