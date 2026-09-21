import { Entity } from "../global/interfaces/entity";
import { IPaymentMethod } from "../params-entities-views/payment-method-management/interfaces/ipayment-method";

export class PaymentMethod implements Entity {
    constructor(public id: string, public name: string){}

    toString() {
        return this.name;
    }

    getId(): string {
        return this.id;
    }

    static fromIPaymentMethod(paymentMethod: IPaymentMethod): PaymentMethod {
        return new PaymentMethod(
            paymentMethod.id,
            paymentMethod.name
        );
    }
}