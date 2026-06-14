"use client";

import { useEffect, useState } from "react";

type ProdutoCarrinho = {
  quantidade: number;
};

export default function Header() {
  const [quantidade, setQuantidade] = useState(0);

  function atualizarQuantidade() {
    const carrinho: ProdutoCarrinho[] = JSON.parse(
      localStorage.getItem("carrinho") || "[]"
    );

    const totalItens = carrinho.reduce((total, item) => {
      return total + item.quantidade;
    }, 0);

    setQuantidade(totalItens);
  }

  useEffect(() => {
    atualizarQuantidade();

    window.addEventListener("storage", atualizarQuantidade);
    window.addEventListener("carrinhoAtualizado", atualizarQuantidade);

    return () => {
      window.removeEventListener("storage", atualizarQuantidade);
      window.removeEventListener("carrinhoAtualizado", atualizarQuantidade);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <a href="/" className="text-2xl font-black tracking-tight">
          Loja Roupas
        </a>

        <nav className="flex flex-wrap items-center gap-3 text-sm md:gap-6">
          <a href="/" className="transition hover:text-gray-500">
            Início
          </a>

          <a href="/produtos" className="transition hover:text-gray-500">
            Produtos
          </a>

          <a
            href="/carrinho"
            className="rounded-full bg-black px-4 py-2 text-white transition hover:bg-gray-800"
          >
            Carrinho ({quantidade})
          </a>
        </nav>
      </div>
    </header>
  );
}