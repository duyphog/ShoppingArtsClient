export class SaleOrder {
    id: string;
    OrderDate: Date;
    AppUserId: string;
    OrderStatusId: number;
    PaymentTypeId: number;
    DeliveryTypeId: string;
    ProductId: string;
    Quantity: number;
    Price: number;
    
    ReceivedDate: Date;
    Status: boolean;
    CreateBy: string;
    CreateDate:Date;
    ModifyBy: string;
    ModifyDate: Date;
    OrderNumber: number;
}
