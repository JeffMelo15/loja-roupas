"use client";

type ToastProps = {
  mensagem: string;
};

export default function Toast({ mensagem }: ToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-lg bg-black px-5 py-3 text-sm text-white shadow-lg">
      {mensagem}
    </div>
  );
}