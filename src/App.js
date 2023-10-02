import React, { useEffect, useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from "axios";

// APAGAR USUÁRIOS MOCKADOS
// const usuariosLocal = [
//   {
//     id: 1,
//     name: "Muri"
//   },
//   {
//     id: 2,
//     name: "Paulinha"
//   },
//   {
//     id: 3,
//     name: "Marcelo"
//   },
//   {
//     id: 4,
//     name: "Rodrigo"
//   },
// ]

function App() {
  const [usuarios, setUsuarios] = useState([]);

  // GUARDAR REQUISIÇÃO EM UMA FUNÇÃO:
  const getAllUsers = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
        {
          headers: {
            Authorization: "fernanda-zanette-krexu",
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  // console.log(getAllUsers);

  // CHAMAR A FUNÇÃO no useEffect:
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <p>
        Para esta aula usaremos a{" "}
        <a
          href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro"
          target="_blank"
          rel="noreferrer"
        >
          API Labenusers
        </a>
      </p>
      <AddUsuario getAllUsers={getAllUsers}/>
      <hr />
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} usuario={usuario}/>;
      })}
    </>
  );
}

export default App;
