import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const User = styled.div`
  border: black 1px solid;
  margin-top: 8px;
  width: 350px;
  padding: 8px;
`;
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  // console.log(usuario)

  const body = {
    name: nome,
    email: email,
  };

  const headers = {
    headers: {
      Authorization: "fernanda-zanette-krexu",
    },
  };

  // GUARDAR REQUISIÇÃO EM UMA FUNÇÃO:
  const getUserById = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
        headers
      )
      .then((response) => {
        // console.log(response.data);
        setUsuario(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getUserById();
  }, []);

  const editUser = () => {
    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
        body,
        headers
      )
      .then(() => {
        alert("Dados alterados com sucesso!");
        setNome("");
        setEmail("");
        setEditar(!editar);
        getUserById();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const deleteUser = () => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
        headers
      )
      .then(() => {
        props.getAllUsers();
        alert("Usuário deletado com sucesso!");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome: {usuario.name}</p>
          <p>E-mail: {usuario.email}</p>
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={editUser}>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>
            <strong>Nome:</strong> {usuario.name}
          </p>
          <p>
            <strong>E-mail:</strong> {usuario.email}
          </p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={deleteUser}>Excluir</button>
    </User>
  );
}

export default Usuario;
