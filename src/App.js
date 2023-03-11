import "./css/styles.scss";
import "./css/categorias.scss";
import "./css/header.scss";
import "./css/tarefas.scss";
import Header from "./componentes/Header";
import Categorias from "./componentes/Categorias";
import Tarefas from "./componentes/Tarefas";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Categorias />
      <Tarefas />
    </div>
  );
}
