import { Module } from "@nestjs/common";
import { PaymentGatewayModule } from "./payment-gateway/payment-gateway.module";
import { FeesTuitionModule } from "./fees-tuition/fees-tuition.module";


@Module({
    imports: [PaymentGatewayModule, FeesTuitionModule],

})
export class FinanceModule { }
