export type Produto = {
  nome: string;
  preco: string;
  slug: string;
  imagem: string;
  categoria: string;
  descricao: string;
  estoque: number;
  destaque: boolean;
  tamanhos: string[];
};

export const produtos: Produto[] = [
  {
    nome: "Camiseta Preta",
    preco: "R$ 79,90",
    slug: "camiseta-preta",
    imagem: "/produtos/camiseta-preta.webp",
    categoria: "Camisetas",
    descricao: "Camiseta básica premium confeccionada em algodão.",
    estoque: 15,
    destaque: true,
    tamanhos: ["P", "M", "G", "GG"],
  },
  {
    nome: "Moletom Street",
    preco: "R$ 149,90",
    slug: "moletom-street",
    imagem: "/produtos/moletom-street.webp",
    categoria: "Camisetas",
    descricao: "Moletom confortável ideal para dias mais frios.",
    estoque: 8,
    destaque: true,
    tamanhos: ["P", "M", "G", "GG"],
  },
  {
    nome: "Calça Cargo",
    preco: "R$ 129,90",
    slug: "calca-cargo",
    imagem: "/produtos/calca-cargo.webp",
    categoria: "Calças",
    descricao: "Calça cargo moderna com bolsos laterais.",
    estoque: 12,
    destaque: true,
    tamanhos: ["38", "40", "42", "44"],
  },
  {
    nome: "Jaqueta Jeans",
    preco: "R$ 199,90",
    slug: "jaqueta-jeans",
    imagem: "/produtos/jaqueta-jeans.webp",
    categoria: "Jaquetas",
    descricao: "Jaqueta jeans clássica para qualquer ocasião.",
    estoque: 6,
    destaque: false,
    tamanhos: ["P", "M", "G", "GG"],
  },
  {
    nome: "Bermuda Cargo",
    preco: "R$ 99,90",
    slug: "bermuda-cargo",
    imagem: "/produtos/bermuda-cargo.webp",
    categoria: "Bermudas",
    descricao: "Bermuda leve e confortável para o dia a dia.",
    estoque: 10,
    destaque: false,
    tamanhos: ["38", "40", "42", "44"],
  },
  {
    nome: "Boné Preto",
    preco: "R$ 59,90",
    slug: "bone-preto",
    imagem: "/produtos/bone-preto.webp",
    categoria: "Camisetas",
    descricao: "Boné ajustável com design minimalista.",
    estoque: 0,
    destaque: false,
    tamanhos: ["Único"],
  },
];