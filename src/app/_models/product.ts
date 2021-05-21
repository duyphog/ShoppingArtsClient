import { Photo } from "./photo";
import { Link } from "./Link";

export class Product {
    id : string;
    productName : string;
    shortDescription : string;
    longDescription : string;
    stock : number;
    price : number;
    origin : string;
    categoryId :string;
    categoryName: string;
    unlimited : boolean;
    location : string;
    warrantyPeriod : number;
    photoUrl : string;
    photos : Photo[];
    status : boolean;
    createBy : string;
    createDate : Date;
    modifyBy : string;
    modifyDate : Date;
}