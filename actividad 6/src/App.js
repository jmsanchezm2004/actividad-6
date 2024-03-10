import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import "./App.css";
import { ListadoEstudiantes } from "./estudiantes/ListadoEstudiantes";
import { EstudianteForm } from "./estudiantes/EstudianteForm";
import { Header } from "./layout/Header";
import { Nav } from "./layout/Nav";
import { Footer } from "./layout/Footer";

export function App() {
  return (
    <Router>
      <div>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ListadoEstudiantes />} />
          <Route path="/estudiante" element={<EstudianteForm />} />
          <Route path="/estudiante/:documento_identidad" element={<EstudianteForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
