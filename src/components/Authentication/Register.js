import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../..";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 400px;
`;
const SubmitButton = styled.button`
  margin-top: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  text-align: left;
`;

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, errorUpdate] = useUpdateProfile(auth);

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(email, password);
    updateProfile({ displayName: username });
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (errorUpdate) {
    return (
      <div>
        <p>Error: {errorUpdate.message}</p>
      </div>
    );
  }
  if (loading || updating) {
    return <p>Loading...</p>;
  }
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="App">
      <Title>Inscription</Title>
      <Form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <SubmitButton onClick={handleRegister}>S'inscrire</SubmitButton>
      </Form>
    </div>
  );
}

export default Register;
