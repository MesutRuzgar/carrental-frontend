import { CarImage } from "./carImage";

export interface Car{
    carId:number;
    modelName:string;
    brandId:number;
    colorId:number;
    brandName:string;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    description:string;
    carImage:CarImage[];

}