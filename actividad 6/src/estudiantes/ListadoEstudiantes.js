import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function ListadoEstudiantes() {
  let url = "https://estudiantes.onrender.com/api/v1/estudiantes/";
  const [estudiantes, setEstudiantes] = useState([]);
  useEffect(() => {
    fetchData(url);
  }, []);

  const handleEliminar = async (id) => {
    try {
      const options = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "*",
          "cache-control": "no-cache",
        },
      };
      await axios.delete(
        `https://estudiantes.onrender.com/api/v1/estudiantes/${id}`,
        {
          options,
        }
      );
      // Después de eliminar, vuelve a cargar los datos actualizados
      //redireccionar a la pagina inicial
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  const fetchData = async (url) => {
    //Incluir configuracion de politicas CORS para invocar componente
    //El componente remoto tambien debe tener politicas para evitar errores
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "*",
        "cache-control": "no-cache",
      },
    };

    console.log("Llamando a componente remoto uniminuto ...");
    axios
      .get(url, {
        options,
      })
      .then(
        (response) => {
          console.log("respuesta es ");
          console.log(response);
          setEstudiantes(response.data.data);
        },
        (error) => {
          console.log("*********** error: ");
          console.log(error);
        }
      );
  };
  return (
    <div>
      <div className="container mt-3">
        <div className="mb-3">
          <Link to="/estudiante">
            <button className="btn btn-success">Agregar Estudiante</button>
          </Link>
        </div>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante, index) => {
              return [
                <tr key={index}>
                  <th scope="row">{estudiante.documento_identificacion}</th>
                  <td>{estudiante.nombres}</td>
                  <td>{estudiante.apellidos}</td>
                  <td>
                    <Link
                      to={`/estudiante/${estudiante.documento_identificacion}`}
                    >
                      <button className="btn btn-primary mr-2">
                        Actualizar
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleEliminar(estudiante.documento_identificacion)
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>,
              ];
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
