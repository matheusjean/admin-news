import httpClient from "../http-client";
import Categories from "../models/categories";

export const getAllCategories = async (): Promise<Categories | null> => {
  try {
    const data = (await httpClient.get("/category")).data;
    if (Array.isArray(data)) {
      return { data };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return null;
  }
};
