interface News {
  data: [
    {
      id: string
      hat: string
      title: string
      text: string
      author: string
      image: string
      link: string
      isActive: boolean | null
    }
  ]
}

export default News
