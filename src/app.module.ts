import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistersModule } from './registers/registers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    RegistersModule,
  ],
})
export class AppModule {}
