export class Order {
    id: string;
    orderDate: Date;
    appUserId: string;
    orderStatusId: number;
    paymentTypeId: number;
    seliveryTypeId: string;
    productId: string;
    quantity: number;
    price: number;
    amount: number;
    firstName: string;
    lastName: string;
    companyName: string;
    contry: string;
    streetAddress: string;
    postCode: string;
    city: string;
    phoneNumber: string;
    orderNote: string;
    orderNumber: number;
    receivedDate: Date;
    status: boolean;
    createBy: string;
    createDate: Date;
    modifyBy: string;
    modifyDate: Date;
}