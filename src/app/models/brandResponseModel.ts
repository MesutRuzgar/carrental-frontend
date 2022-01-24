import { Brand } from "./brands";
import { ResponseModel } from "./responseModule";

export interface BrandResponseModel extends ResponseModel {
    data:Brand[]
}