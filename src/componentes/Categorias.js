import { useState } from "react";
import Nav from "./nav_categoria.js";

const Categoria = () => {
  const [add, setAdd] = useState(false);
  const adicionar = () => {
    add === false ? setAdd(true) : setAdd(false);
  };

  return (
    <section id="categorias">
      <button onClick={adicionar}>Adicionar Categoria</button>
      <Nav on={add} adicionar={adicionar} />
    </section>
  );
};

export default Categoria;
