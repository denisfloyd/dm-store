export interface Product {
  id: number,
  title: string,
  price: number,
  priceFormatted?: string,
  description: string,
  image: string,
  category: string,

  favorite?: boolean,
}

export interface User {
  email: string,
  password: string,
  name: string,
}
