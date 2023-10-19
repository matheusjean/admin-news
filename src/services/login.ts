import httpClient from "../http-client";

interface IFormSignIn {
  email: string;
  password: string;
}

export const login = async ({ email, password }: IFormSignIn) => {
  try {
    const response = (
      await httpClient.post(`login`, {
        email,
        password,
      })
    ).data;
    return response;
  } catch (error) {
    console.error("Erro na solicitação de login:", error);
    throw error;
  }
};
