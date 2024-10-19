import { Module } from '@nestjs/common';
import { RegistersService } from './registers.service';
import { RegistersController } from './registers.controller';
import { Register, RegisterSchema } from './entities/register.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
    ]),
  ],
  controllers: [RegistersController],
  providers: [RegistersService],
})
export class RegistersModule {}
