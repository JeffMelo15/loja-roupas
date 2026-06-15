"use client";

import { useEffect, useState } from "react";
import { Produto } from "../data/produtos";

type FavoriteButtonProps = {
  produto: Produto;
};

export default function FavoriteButton({ produto }: FavoriteButtonProps) {
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    const favoritos: Produto[] = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

    setFavoritado(favoritos.some((item) => item.slug === produto.slug));
  }, [produto.slug]);

  function alternarFavorito() {
    const favoritos: Produto[] = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

    const jaExiste = favoritos.some((item) => item.slug === produto.slug);

    let novosFavoritos: Produto[];

    if (jaExiste) {
      novosFavoritos = favoritos.filter((item) => item.slug !== produto.slug);
      setFavoritado(false);
    } else {
      novosFavoritos = [...favoritos, produto];
      setFavoritado(true);
    }

    localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    window.dispatchEvent(new Event("favoritosAtualizado"));
  }

  return (
    <button
      type="button"
      onClick={alternarFavorito}
      className="rounded-full border px-4 py-2 text-sm transition hover:bg-gray-100"
    >
      {favoritado ? "❤️ Favoritado" : "🤍 Favoritar"}
    </button>
  );
}