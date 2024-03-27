"use client";
import Image from "next/image";

import questionIcon from "@/assets/question.svg";

const Home = () => {
  const form = (
    <form className="flex gap-4">
      <div className="flex gap-1">
        <span>SKU:</span>
        <input type="text" className="bg-gray-600" />
      </div>
      <div className="flex gap-1">
        <span>PRODUCTO:</span>
        <input type="text" className="bg-gray-600" />
      </div>
      <button className="bg-white text-black px-3 py-1 rounded">Agregar</button>
    </form>
  );

  const table = (
    <table>
      <thead>
        <tr>
          <th className="border border-white">ID</th>
          <th className="border border-white">SKU</th>
          <th className="border border-white">PRODUCTO</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <div className="flex flex-col border border-white">
        <span>El email del usuario es: </span>
        <span className="flex gap-2 text-xs">
          <Image src={questionIcon} alt="question" width={18} height={18} />
          Colocar el email que fue tipeado en el Login y guardar el ID para
          usarlo en la creación de productos
        </span>
      </div>

      <div className="flex flex-col p-2 border border-white m-6">
        <span className="flex gap-2 text-xs">
          <Image src={questionIcon} alt="question" width={18} height={18} />
          Relacionar con mutación de creación de producto (vincular cuenta)
        </span>
        {form}
      </div>

      <div className="flex flex-col p-2">
        <span className="flex gap-2 text-xs">
          <Image src={questionIcon} alt="question" width={18} height={18} />
          Relacionar con query de listado de productos (vincular cuenta)
        </span>
        {table}
      </div>
    </main>
  );
};

export default Home;
