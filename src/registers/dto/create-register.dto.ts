import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';

export class CreateRegisterDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Only alphabetic characters are allowed in name.',
  })
  @Transform(({ value }) => value.trim())
  name: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;
}
