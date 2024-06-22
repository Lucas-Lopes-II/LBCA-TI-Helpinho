import { Controller } from '@nestjs/common';
import { HelpsService } from './helps.service';

@Controller('helps')
export class HelpsController {
  constructor(private readonly helpsService: HelpsService) {}
}
