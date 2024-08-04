export interface CategoryRequest {
    catId: number,
    parentCategory: number
}
export interface CategoryRequestNew {
    catId: number,
    parentCategory: number,
    Flag?:string
}

export interface CategoryResponse {
    resultType: number,
    responseCode: number,
    message: string,
    data: Category[]
}

export interface Category {
    id: number,
    parentId: number,
    name: string,
    description: string,
    imagePath: string,
    backColorCode: string,
    foreColorCode: string,
    isActive: boolean,
    noOfProduct: number,
    children: Category[],
    isSCat: boolean,
    isSelected: boolean,
}
export interface CategoryNew {
    id: number,
    parentId: number,
    name: string,
    description: string,
    imagePath: string,
    backColorCode: string,
    foreColorCode: string,
    isActive: boolean,
    noOfProduct: number,
    children: Category[],
    isSCat: boolean,
    isSelected: boolean,
    isCat2: boolean
}
export interface HomeCategoryRequest {
    EmpCode: string,
    SelectedSMCode: string,
    SelectedCBACode: string
}

export enum CategoryType {
    All = 1,
    Category = 2,
    SubCategory = 3,
    Producct = 4
}