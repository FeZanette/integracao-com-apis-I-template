import axios from "axios";
import React, { useState } from "react";

function AddUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const body = {
    name: nome,
    email:email
  }

  const headers = {
    headers: {
      Authorization: "fernanda-zanette-krexu"
    }
  }

  const createUser = () => {
    axios.post ("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", body, headers)
    .then(() => {
      alert("Usuário criado com sucesso!")
      setNome("")
      setEmail("")
      props.getAllUsers()
    })
    .catch((err) => {
      console.log(err.response);
    })
  }
 
  return (
    <>
      <h3>Adicionar novo usuario</h3>
      <input
        placeholder={"nome"}
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder={"email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={createUser}>Enviar</button>
    </>
  );
}

export default AddUsuario;
