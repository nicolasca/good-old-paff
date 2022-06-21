export const authErrosCode = {
  USER_NOT_FOUND: "auth/user-not-found",
  INVALID_EMAIL: "auth/invalid-email",
  WRONG_PASSWORD: "auth/wrong-password",
  EMAIL_ALREADY_USED: "auth/email-already-in-use",
};

export const errorMessages = {
  [authErrosCode.USER_NOT_FOUND]: "Ce joueur n'existe pas petit filou.",
  [authErrosCode.INVALID_EMAIL]: "L'email est invalide.",
  [authErrosCode.WRONG_PASSWORD]: "Login ou mot de passe invalide.",
  [authErrosCode.EMAIL_ALREADY_USED]: "Email déjà existant.",
};
