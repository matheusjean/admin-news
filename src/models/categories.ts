interface Categories {
  data: {
    id: string;
    name: string;
    is_active?: boolean;
    created_at: Date;
  }[];
}

export default Categories;
