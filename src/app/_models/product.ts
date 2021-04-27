import { Photo } from "./photo";
import { Link } from "./Link";

export interface Product {
    Id : string;
    ProductName : string;
    ShortDescription : string;
    LongDescription : string;
    Stock : number;
    Price : number;
    Origin : string;
    CategoryId :string;
    Unlimited : boolean;
    Location : string;
    WarrantyPeriod : number;
    PhotoUrl : string;
    Photos : Photo[];
    Status : boolean;
    CreateBy : string;
    CreateDate : Date;
    ModifyBy : string;
    ModifyDate : Date;
    links: Link[]
}