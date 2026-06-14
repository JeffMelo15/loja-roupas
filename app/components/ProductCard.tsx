import { Produto } from "../data/produtos";

type ProductCardProps = {
  produto: Produto;
};

export default function ProductCard({ produto }: ProductCardProps) {
  const semEstoque = produto.estoque <= 0;

  return (
    <a
      href={`/produtos/${produto.slug}`}
      className={`group rounded-lg border p-4 transition ${
        semEstoque
          ? "pointer-events-none opacity-50"
          : "hover:shadow-lg"
      }`}
    >
      <div className="mb-3 flex gap-2">
        {produto.destaque && (
          <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
            🔥 Destaque
          </span>
        )}

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
          {produto.categoria}
        </span>

        {semEstoque && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
            Sem estoque
          </span>
        )}
      </div>

      <div className="mb-4 overflow-hidden rounded">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className={`h-72 w-full object-cover transition duration-300 ${
            semEstoque ? "grayscale" : "group-hover:scale-105"
          }`}
        />
      </div>

      <h2 className="font-semibold">{produto.nome}</h2>

      <p className="mt-1 text-lg font-bold">{produto.preco}</p>

      <span className="mt-4 inline-block text-sm font-medium text-gray-600">
        {semEstoque ? "Indisponível" : "Ver produto →"}
      </span>
    </a>
  );
}