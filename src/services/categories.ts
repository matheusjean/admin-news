import httpClient from "../http-client";
import Categories from "../models/categories";
import CategoryData from "../models/categoryData";
import Category from "../models/for-update/category";

interface CategoryRequest {
  id?: string;
  isActive?: boolean;
}
interface CategoryForCreate {
  name?: string;
  isActive?: boolean;
}

interface CategoriesInactivate {
  data: [
    {
      id: string;
      name: string;
      is_active?: boolean;
      created_at: Date;
    }
  ];
}

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

export const getCategoryId = async (categoryId: string): Promise<Category> => {
  const category = await (await httpClient.get(`category/${categoryId}`)).data;

  return category;
};

export const getCategory = async (): Promise<CategoryData> => {
  const category = (await httpClient.get(`category`)).data;
  return category;
};

export const createCategory = async (newCategory: CategoryForCreate) => {
  const createCategory = (await httpClient.post<any>(`category`, newCategory))
    .data;

  return createCategory;
};

export const updateCategoriesResponse = async (
  categoryId: string,
  categoryToBeUpdated: CategoryForCreate
): Promise<CategoriesInactivate> => {
  const category = (
    await httpClient.put(`category/${categoryId}`, categoryToBeUpdated)
  ).data;

  return category;
};

export const updateCategoryById = async (
  categoryId: string,
  data: CategoryRequest
): Promise<CategoriesInactivate> => {
  return (await httpClient.put(`category/${categoryId}`, data)).data;
};

export const deleteCategory = async (categoryId: string) => {
  await httpClient.delete(`category/${categoryId}`);
};
