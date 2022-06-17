import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../..";
import { authErrosCode, errorMessages } from "./auth.constants";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 400px;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  text-align: left;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Title>Connexion</Title>

      <Form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <SubmitButton
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Se connecter
        </SubmitButton>
      </Form>

      <div>
        Mot de passe oublié ?{" "}
        <Link to={"/forgotten-password"}>Réinitialiser</Link>{" "}
      </div>
      <div>
        Pas encore de compte ? <Link to={"/register"}>S'inscrire</Link>{" "}
      </div>

      {loading ? <p>Loading...</p> : null}

      {error ? (
        Object.values(authErrosCode).includes(error.code) ? (
          <div>
            <p>{errorMessages[error.code]}</p>
          </div>
        ) : (
          <div>
            <p>Error: {error.message}</p>
          </div>
        )
      ) : null}
    </div>
  );
}

export default Login;
