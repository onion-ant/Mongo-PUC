import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';

export class CreateRegisterDto {
  @ApiProperty({ required: true, example: 'Antonio Henrique Bertolini Vidal' })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Only alphabetic characters are allowed in name.',
  })
  @Transform(({ value }) => value.trim())
  name: string;
  @ApiProperty({ required: true, example: 'antoniohenriquebv@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ required: true, example: '3199999999' })
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;
}
