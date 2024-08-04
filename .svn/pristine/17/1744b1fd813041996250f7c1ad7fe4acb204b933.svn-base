export interface CollectionRequest {
    catId: number,
    parentCategory: number,
    Flag?:string
}


export interface CollectionResponse {
    resultType: number,
    responseCode: number,
    message: string,
    data: Collection[]
}

export interface Collection {
    collectionId: number,
 
    collectionName: string,
    showOnMenu: boolean,
    showOnDashBoard: boolean,
    showOnFilter: boolean,
    showOnFooter: boolean,
    imagePath: boolean,
    noOfProduct: number,
    children: Collection[],
    isSelected: boolean,
}

export interface ApplicationAreas {
    collectionId: number,
 
    collectionName: string,
    applicationAreaId: number,
    applicationAreaName: string,

    imagePath: string,
    noOfProduct: number,
    children: ApplicationAreas[],
    isSelected: boolean,
}

export enum CategoryType {
    All = 1,
    Category = 2,
    SubCategory = 3,
    Producct = 4
}