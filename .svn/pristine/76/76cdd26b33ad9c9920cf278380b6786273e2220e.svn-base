import { ProductDetails } from "../product/product";

export interface OrderListResponse {
    statusCode: number,
    isSuccess: boolean,
    message: string,
    data: Order[]
}

export interface OrderResponse {
    statusCode: number,
    isSuccess: boolean,
    message: string,
    data: Order
}

export interface Order {
    orderId: string,
    orderNumber: string,
    purchaseOrderNumber: string,
    totalAmount: number,
    discountPercent: number,
    discountAmount: number,
    tax: number,
    deliveryCharge: number,
    payableAmount: number,
    isOrderPlaced: boolean,
    isCancelled: boolean,
    cancelledBy: any,
    cancelledDate: Date,
    previousOutStanding: number,
    isPaidFromCredit: boolean,
    paidCreditAmount: number,
    selfPaidAmount: number,
    totalPaid: number,
    isTermsConditionsAccepted: boolean,
    remark: string,
    orderItems: OrderItem[],
    orderAddresses: OrderAddress[],
    deliveryOptions: DeliveryOptions,
    currency: Currency,
    status: string,
    cbaStatus: string,
    smStatus: string,
    adminStatus: string,
    orderStatusColor: string,
    cartId: string,
    orderPlacedDate: Date,
    createdDate: Date,
    designCharges: number,
    specialDiscount: number,
    promotionalDiscount: number,
    createdBy: string,
    cbaCode: string,
    cbaName: string,
    smName: string,
    smPhone: string,
    orderStatus: number,
    preOrders: PreOrders[],
    deliveredOrderItems: string,
    approvalRemark: string,
    isSetDeliveryPlan: boolean,
    smCode: string;
    isEditable?: boolean,
    isReOrder?: boolean,
}

export interface OrderItem {
    id: string,
    orderId: string,
    userId: number,
    productId: number,
    productName: string,
    productImage: string,
    basePrice: number,
    sellingPrice: number,
    quantity: number,
    totalPrice: number,
    totalAmount: number,
    discountPercent: number,
    discountAmount: number,
    tax: number,
    payableAmount: number,
    product: ProductDetails,
    physicalStockQuantity: number,
    inTransitStockQuantity: number,
    orderPlacedQuantity: number
    plannedQty: number,
    unplannedQty: number,
    cancelQty: number
}

export interface OrderAddress {
    orderId: string,
    orderAddressType: number,
    orderAddressName: string,
    addressTypeId: number,
    addressId: number,
    addressType: string,
    addressLine1: string,
    addressLine2: string,
    cityId: number,
    stateId: number,
    pinCodeId: number,
    countryId: number,
    latitude: string,
    longitude: string,
    mobile: string,
    phone: string,
    emailId: string,
    customerName: string,
    pinCode: string,
    cbaEmpCode: string,
    salseManagerEmpCode: string,
    userType: string,
    customerContact: string,
    pickUpDateTime: string,
    pickUpDateTimeFrom: string,
    pickUpDateTimeTo: string,
    pickUpTimeFrom: string,
    pickUpTimeTo: string
    city?: string;
    state?: string;
    email?: string;
    deliveryInstruction?: string;
}

export interface DeliveryOptions {
    orderId: string,
    deliveryOptionType: number,
    name: string,
    totalDeliveryCharges: number,
    tailLift: boolean,
    tailLiftCharge: number,
    applicableCharges: number,
    deliveryDate: Date,
    uniqueName: string
}

export interface PreOrders {
    isApproved: boolean,
    deliveredRemark: string,
    orderNumber: string,
    id: string,
    cbaDeliveredDate?: Date,
    cfDeliveredDate?: Date,
    preOrderItem: PreOrdersItem[],
    cbacpsName: string,
    cbacpsCode: string,
    orderStatus: number,
    sentToEpicorDate?: Date,
    pendingWithLogisticsDate?: Date,
    finalDeliveredBy: string
}
export interface PreOrdersItem {
    id: string,
    productName: string,
    productCode: string,
    quantity: number
}

export interface OrderRequest {
    cartId: string,
    orderForId: number,
    orderAddresses: OrderAddress[],
    deliveryOptions: DeliveryOptions
}

export interface Currency {
    code: string,
    currencyPath: string,
    name: string,
    symbol: string
}

