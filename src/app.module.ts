import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
