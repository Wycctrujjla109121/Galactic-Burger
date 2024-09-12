export interface IngridientsType{
    _id:string,
    name:string,
    type:string,
    proteins:number,
    fat:number,
    carbohydrates:number,
    calories:number,
    price:number,
    image:string,
    image_mobile:string,
    image_large:string,
    __v:number
}

export interface ConstructorIngridientsType extends IngridientsType {
    uniqId: string
  }

export interface DragItemType {
    ingridient: ConstructorIngridientsType,
    index: number
}

export interface OrderType{
    name: string
    order: {
        number: number
    },
    success: boolean
}
