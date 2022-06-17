import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../..";

const Title = styled.h2`
  margin-bottom: 2rem;
`;

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sendPasswordResetEmail, error] = useSendPasswordResetEmail(auth);

  const handleSendEmail = async () => {
    await sendPasswordResetEmail(email);
    setEmailSent(true);
  };

  return (
    <div>
      <Title>Réinitialiser le mot de passe</Title>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailSent ? (
          error ? (
            <p>Error: {error.message}</p>
          ) : (
            <p>L'email a été envoyé !</p>
          )
        ) : (
          <button onClick={handleSendEmail}>Je le veux</button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
