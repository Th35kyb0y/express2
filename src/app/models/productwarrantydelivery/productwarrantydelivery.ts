
export interface ProductWarrantyDeliveryResponse {
    statusCode: number,
    isSuccess: boolean,
    message: string,
    data: ProductWarrantyDelivery
}
export interface ProductWarrantyDelivery {
    warranty: ProductWarranty,
    delivery: ProductDelivery,
}
export interface ProductWarranty {
    warrantyImage: string,
    warrantyURL: string,
    warrantyTitle: string,
    warrantyDescriptions: string
}
export interface ProductDelivery {
    deliveryImage: string,
    deliveryURL: string,
    deliveryTitle: string,
    deliveryDescriptions: string
}

