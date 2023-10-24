interface NewsForCreate {
  hat: string;
  image: string;
  isActive: boolean;
  link: string;
  isHighlighted?: number;
  text: string;
  title: string;
  categoryIds: string[];
}

export default NewsForCreate;
