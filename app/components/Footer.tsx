export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white px-4 py-8 text-black md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <h2 className="mb-3 text-xl font-black">Loja Roupas</h2>
          <p className="text-sm text-gray-600">
            Roupas modernas, confortáveis e com preço justo.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Navegação</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <a href="/">Início</a>
            <a href="/produtos">Produtos</a>
            <a href="/carrinho">Carrinho</a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Atendimento</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <span>Segunda a sexta</span>
            <span>09h às 18h</span>
            <span>contato@lojaroupas.com</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t pt-4 text-center text-sm text-gray-500">
        © 2026 Loja Roupas. Todos os direitos reservados.
      </div>
    </footer>
  );
}