export interface ProductDetails {
  id: number,
  name: string,
  description: string,
  overview: string,
  technicalSpec: string,
  code: string,
  price: number,
  currency: Currency,
  effectiveFrom: Date,
  effectiveTo: Date,
  productTypeId: number,
  measurementUnitId: number,
  length: number,
  height: number,
  width: number,
  measurementUnit: string,
  productType: string,
  contents: Content[],
  features: Feature[],
  clubDetail: Club[],
  vendors: Vendor[],
  stock: number,
  rating: number,
  taxSlab: any,
  discount: Discount,
  categoryId: number,
  addToCartText: string,
  quantity: number,
  goToCart: boolean,
  inWishlist: boolean,
  shortDescription: string,
  warranty: string,
  instock: string,
  certificateList: any[],
  ratingId: number,
  applicationAreaList: any[],
  ratingIdList: any[],
  catOrderNo: number,
  orderNo: number,
  totalCount?: number,
  categories?: any[],
  applicationArea?: any[],
  ratings?: any[],
  productCertificate?: any[],
  productWarranty?: any[],
  customers_basket_quantity?:number
  subtotal?:any
  total?:any;
  cart_id?:any
  alt?:any
  alt_title?:any
}

export interface Currency {
  name: string,
  code: string,
  symbol: string,
  currencyPath: string
}

export interface Content {
  productVendorId: number,
  productVendor: string,
  contentTypeId: number,
  contentType: ContentType,
  link: string,
  content: string,
  orderNo: number,
  isMain: boolean
}

export enum ContentType {
  VideoLinks = 1,
  Brochure = 2,
  DataSheet = 3,
  Presentation = 4,
  Image = 5,
  TechnicalSpecifications = 6,
}

export interface Feature {
  id: number,
  title: string,
  detail: string,
  isClicked: boolean,
  isHtmlLink: boolean,
  isPdfLink: boolean
}

export interface Club {

}

export interface Vendor {
  id: number,
  name: string,

}

export interface ProductViewsRequest {
  productId: number
}

export interface Discount {
  price: number,
  discountedPrice: number,
  discountAmount: number,
  value?: number,
  discountType: DiscountType
}

export enum DiscountType {
	None,
	Fixed,
	Percent
}
export interface ProductViewsRequest {
  productId: number
}
