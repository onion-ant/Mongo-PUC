import { Expose } from 'class-transformer';

export class OneRegisterDto {
  @Expose()
  _id: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phone: string;
}
