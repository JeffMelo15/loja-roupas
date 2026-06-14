"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type ProdutoCarrinho = {
  nome: string;
  preco: string;
  slug: string;
  imagem: string;
  quantidade: number;
  tamanho: string;
};

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setCarrinho(carrinhoSalvo);
  }, []);

  function salvarCarrinho(novoCarrinho: ProdutoCarrinho[]) {
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    setCarrinho(novoCarrinho);
    window.dispatchEvent(new Event("carrinhoAtualizado"));
  }

  function aumentarQuantidade(slug: string, tamanho: string) {
    const novoCarrinho = carrinho.map((item) =>
      item.slug === slug && item.tamanho === tamanho
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    );

    salvarCarrinho(novoCarrinho);
  }

  function diminuirQuantidade(slug: string, tamanho: string) {
    const novoCarrinho = carrinho
      .map((item) =>
        item.slug === slug && item.tamanho === tamanho
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
      .filter((item) => item.quantidade > 0);

    salvarCarrinho(novoCarrinho);
  }

  function removerItem(slug: string, tamanho: string) {
    const novoCarrinho = carrinho.filter(
      (item) => !(item.slug === slug && item.tamanho === tamanho)
    );

    salvarCarrinho(novoCarrinho);
  }

  function limparCarrinho() {
    salvarCarrinho([]);
  }

  function converterPreco(preco: string) {
    return Number(preco.replace("R$ ", "").replace(".", "").replace(",", "."));
  }

  const total = carrinho.reduce((soma, produto) => {
    return soma + converterPreco(produto.preco) * produto.quantidade;
  }, 0);

  const totalFormatado = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="px-4 py-10 md:px-8">
        <a
          href="/produtos"
          className="mb-6 inline-block rounded-lg border px-4 py-2"
        >
          ← Continuar comprando
        </a>

        <h1 className="mb-8 text-4xl font-bold">Carrinho</h1>

        {carrinho.length === 0 ? (
          <p className="text-gray-600">Seu carrinho está vazio.</p>
        ) : (
          <div className="space-y-4">
            {carrinho.map((produto) => (
              <div
                key={`${produto.slug}-${produto.tamanho}`}
                className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="h-24 w-24 rounded object-cover"
                  />

                  <div>
                    <h2 className="font-semibold">{produto.nome}</h2>

                    <p className="text-sm text-gray-600">
                      Tamanho: {produto.tamanho}
                    </p>

                    <p>{produto.preco}</p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() =>
                          diminuirQuantidade(produto.slug, produto.tamanho)
                        }
                        className="rounded border px-3 py-1"
                      >
                        -
                      </button>

                      <span>{produto.quantidade}</span>

                      <button
                        onClick={() =>
                          aumentarQuantidade(produto.slug, produto.tamanho)
                        }
                        className="rounded border px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removerItem(produto.slug, produto.tamanho)}
                  className="rounded-lg border px-4 py-2 text-sm"
                >
                  Remover
                </button>
              </div>
            ))}

            <div className="mt-6 rounded-lg border p-4">
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Total</span>
                <span>{totalFormatado}</span>
              </div>
            </div>

            <button
              onClick={limparCarrinho}
              className="rounded-lg bg-black px-6 py-3 text-white"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}