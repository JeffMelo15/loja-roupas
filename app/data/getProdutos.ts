import { produtos as produtosBase, Produto } from "./produtos";

export function getProdutos(): Produto[] {
  if (typeof window === "undefined") {
    return produtosBase;
  }

  const produtosSalvos = localStorage.getItem("produtosAdmin");

  if (!produtosSalvos) {
    return produtosBase;
  }

  return JSON.parse(produtosSalvos);
}