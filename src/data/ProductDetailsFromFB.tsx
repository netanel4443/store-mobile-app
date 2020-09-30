
export class ProductDetailsFromFB{
  productName:string
  productDescription:string
  price:number
  imageUrl:string
  category:string
  
  constructor( productName:string,
    productDescription:string,
    price:number,
    imageUrl:string,
    category:string,)
  {
    this.productName=productName
    this.productDescription=productDescription
    this.price=price
    this.imageUrl=imageUrl
    this.category=category
  }

}