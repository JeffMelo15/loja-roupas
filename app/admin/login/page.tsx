"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar() {
    if (email === "admin@loja.com" && senha === "123456") {
      localStorage.setItem("adminLogado", "true");
      window.location.href = "/admin";
      return;
    }

    setErro("E-mail ou senha inválidos.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 text-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold">Painel Admin</h1>
        <p className="mb-8 text-gray-600">Entre para gerenciar a loja.</p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
          />

          {erro && <p className="text-sm text-red-600">{erro}</p>}

          <button
            onClick={entrar}
            className="w-full rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}