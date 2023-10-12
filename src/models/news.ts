interface News {
  author: string;
  hat: string;
  id: string;
  image: string;
  isActive: boolean;
  link: string;
  text: string;
  title: string;
  categories: [
    {
      created_at: string;
      id: string;
      isActive: boolean;
      name: string;
      updated_at: Date;
    }
  ];
  created_at: Date;
  updated_at: Date;
}

export default News;
