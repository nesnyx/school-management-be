import { Controller, Post, Body } from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) { }

  @Post("checkout")
  async checkout(@Body() createDonationDto: CreateDonationDto) {
    return await this.donationService.create(createDonationDto);
  }


}
