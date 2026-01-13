import { Module } from "@nestjs/common";
import { PaymentGatewayModule } from "./payment-gateway/payment-gateway.module";
import { FeesTuitionModule } from "./fees-tuition/fees-tuition.module";
import { DonationModule } from "./donation/donation.module";


@Module({
    imports: [PaymentGatewayModule, FeesTuitionModule, DonationModule],

})
export class FinanceModule { }
