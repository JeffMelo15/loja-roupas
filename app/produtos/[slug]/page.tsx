"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { produtos } from "../../data/produtos";

type ProdutoCarrinho = {
  nome: string;
  preco: string;
  slug: string;
  imagem: string;
  quantidade: number;
  tamanho: string;
};

export default function ProdutoPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");

  const produtoEncontrado = produtos.find((item) => item.slug === slug);

  if (!produtoEncontrado) {
    return <main className="p-8">Produto não encontrado.</main>;
  }

  const produto = produtoEncontrado;

  const relacionados = produtos
    .filter(
      (item) =>
        item.categoria === produto.categoria && item.slug !== produto.slug
    )
    .slice(0, 3);

  function adicionarAoCarrinho() {
    if (produto.estoque <= 0) {
      alert("Produto sem estoque.");
      return;
    }

    if (!tamanhoSelecionado) {
      alert("Selecione um tamanho.");
      return;
    }

    const carrinhoAtual: ProdutoCarrinho[] = JSON.parse(
      localStorage.getItem("carrinho") || "[]"
    );

    const produtoExistente = carrinhoAtual.find(
      (item) =>
        item.slug === produto.slug && item.tamanho === tamanhoSelecionado
    );

    let novoCarrinho: ProdutoCarrinho[];

    if (produtoExistente) {
      novoCarrinho = carrinhoAtual.map((item) =>
        item.slug === produto.slug && item.tamanho === tamanhoSelecionado
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
    } else {
      novoCarrinho = [
        ...carrinhoAtual,
        {
          nome: produto.nome,
          preco: produto.preco,
          slug: produto.slug,
          imagem: produto.imagem,
          quantidade: 1,
          tamanho: tamanhoSelecionado,
        },
      ];
    }

    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    window.dispatchEvent(new Event("carrinhoAtualizado"));

    alert("Produto adicionado ao carrinho!");
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-2 md:px-8 md:py-10">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="h-96 w-full rounded-lg object-cover md:h-[500px]"
        />

        <div>
          <a
            href="/produtos"
            className="mb-6 inline-block rounded-lg border px-4 py-2"
          >
            ← Voltar
          </a>

          <div className="mb-3 flex flex-wrap gap-2">
            {produto.destaque && (
              <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                🔥 Destaque
              </span>
            )}

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
              {produto.categoria}
            </span>

            {produto.estoque <= 0 && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                Sem estoque
              </span>
            )}
          </div>

          <h1 className="mb-4 text-4xl font-bold">{produto.nome}</h1>
          <p className="mb-6 text-2xl font-semibold">{produto.preco}</p>

          <div className="mb-6 space-y-3">
            <p className="text-gray-600">{produto.descricao}</p>

            <p>
              <strong>Categoria:</strong> {produto.categoria}
            </p>

            <p>
              <strong>Estoque:</strong> {produto.estoque} unidades
            </p>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 font-semibold">Tamanho</h3>

            <div className="flex flex-wrap gap-3">
              {produto.tamanhos.map((tamanho) => (
                <button
                  key={tamanho}
                  type="button"
                  onClick={() => setTamanhoSelecionado(tamanho)}
                  className={`rounded-lg border px-4 py-2 transition ${
                    tamanhoSelecionado === tamanho
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  {tamanho}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={adicionarAoCarrinho}
            disabled={produto.estoque <= 0}
            className={`mb-4 w-full rounded-lg px-6 py-3 text-white ${
              produto.estoque <= 0
                ? "cursor-not-allowed bg-gray-400"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {produto.estoque <= 0
              ? "Produto indisponível"
              : "Adicionar ao carrinho"}
          </button>

          <a
            href="/carrinho"
            className="block w-full rounded-lg border px-6 py-3 text-center"
          >
            Ver carrinho
          </a>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="px-4 py-12 md:px-8">
          <h2 className="mb-6 text-3xl font-bold">Você também pode gostar</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((item) => (
              <ProductCard key={item.slug} produto={item} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}