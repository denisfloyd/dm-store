export interface Product {
  id: number,
  title: string,
  price: number,
  priceFormatted?: string,
  description: string,
  image: string,
  category: string,

  favorite?: boolean,
  amount: number;
}

export interface User {
  username: string,
  token: string,
}
