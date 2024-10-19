import { Module } from '@nestjs/common';
import { RegistersService } from './registers.service';
import { RegistersController } from './registers.controller';

@Module({
  controllers: [RegistersController],
  providers: [RegistersService],
})
export class RegistersModule {}
