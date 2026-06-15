"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Produto } from "../../../data/produtos";
import { getProdutos } from "../../../data/getProdutos";

export default function EditarProdutoPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [produto, setProduto] = useState<Produto | null>(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const produtos = getProdutos();
    const produtoEncontrado = produtos.find((item) => item.slug === slug);

    if (produtoEncontrado) {
      setProduto(produtoEncontrado);
    }
  }, [slug]);

  if (!produto) {
    return <main className="p-8">Produto não encontrado.</main>;
  }

  function salvarAlteracoes() {
  if (!produto) return;

  const produtos = getProdutos();

  const produtosAtualizados = produtos.map((item) =>
    item.slug === produto.slug ? produto : item
  );

  localStorage.setItem("produtosAdmin", JSON.stringify(produtosAtualizados));

  setMensagem("Produto atualizado com sucesso!");

  setTimeout(() => {
    window.location.href = "/admin";
  }, 1000);
}

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
        <a href="/admin" className="mb-6 inline-block rounded-lg border px-4 py-2">
          ← Voltar
        </a>

        <h1 className="mb-6 text-3xl font-bold">Editar Produto</h1>

        {mensagem && (
          <p className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-green-700">
            {mensagem}
          </p>
        )}

        <div className="space-y-4">
          <input
            value={produto.nome}
            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            value={produto.preco}
            onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            value={produto.categoria}
            onChange={(e) =>
              setProduto({ ...produto, categoria: e.target.value })
            }
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="number"
            value={produto.estoque}
            onChange={(e) =>
              setProduto({ ...produto, estoque: Number(e.target.value) })
            }
            className="w-full rounded-lg border px-4 py-3"
          />

          <textarea
            value={produto.descricao}
            onChange={(e) =>
              setProduto({ ...produto, descricao: e.target.value })
            }
            rows={5}
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            value={produto.tamanhos.join(", ")}
            onChange={(e) =>
              setProduto({
                ...produto,
                tamanhos: e.target.value.split(",").map((item) => item.trim()),
              })
            }
            className="w-full rounded-lg border px-4 py-3"
          />

          <button
            onClick={salvarAlteracoes}
            className="rounded-lg bg-black px-6 py-3 text-white"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </main>
  );
}