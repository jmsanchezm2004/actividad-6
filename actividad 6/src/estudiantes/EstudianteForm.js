import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export function EstudianteForm() {
  console.log("Invocando componente formulario");
  const [estudiante, setEstudiante] = useState({
    documento_identificacion: "",
    nombres: "",
    apellidos: "",
    genero: "",
    email: "",
    direccion: "",
    telefono: "",
  });
  const { documento_identidad } = useParams();
  //const history = useHistory();
  useEffect(() => {
    console.log("Valor estudianteId: " + documento_identidad);
    if (documento_identidad) {
      console.log("Invocar carga de datos: " + documento_identidad);
      // Si se proporciona un ID de estudiante, cargar los datos del estudiante para la edición
      cargarDatosEstudiante(documento_identidad);
    }
  }, [documento_identidad]);

  const cargarDatosEstudiante = async (documento_identidad) => {
    let url = `https://estudiantes.onrender.com/api/v1/estudiantes/${documento_identidad}`;
    console.log("URL ES " + url);
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "*",
        "cache-control": "no-cache",
      },
    };

    axios
      .get(url, {
        options,
      })
      .then(
        (response) => {
          console.log("respuesta es response.data:" + response.data.nombres);
          setEstudiante(response.data.data);
        },
        (error) => {
          console.log("*********** error: ");
          console.log(error);
        }
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstudiante({ ...estudiante, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = "";
      if (documento_identidad) {
        // Si hay un ID de estudiante, realizar una solicitud de actualización
        response = await axios.put(
          `https://estudiantes.onrender.com/api/v1/estudiantes/${documento_identidad}`,
          estudiante
        );
      } else {
        // Si no hay ID de estudiante, realizar una solicitud de creación
        response = await axios.post(
          "https://estudiantes.onrender.com/api/v1/estudiantes/",
          estudiante
        );
      }

      console.log("Respuesta del servidor:", response.data);
      //history.push('/');
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="documentacion">
        <Form.Label>Documentación</Form.Label>
        <Form.Control
          type="text"
          name="documentacion"
          value={estudiante.documento_identificacion}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={estudiante.nombre}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="apellidos">
        <Form.Label>Apellidos</Form.Label>
        <Form.Control
          type="text"
          name="apellidos"
          value={estudiante.apellidos}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="genero">
        <Form.Label>Género</Form.Label>
        <Form.Control
          as="select"
          name="genero"
          value={estudiante.genero}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={estudiante.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="direccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"
          name="direccion"
          value={estudiante.direccion}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="telefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="tel"
          name="telefono"
          value={estudiante.telefono}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {documento_identidad ? "Actualizar" : "Crear"}
      </Button>
    </Form>
  );
}
