import { Expose } from 'class-transformer';

export class ManyRegisterDto {
  @Expose()
  _id: string;
  @Expose()
  name: string;
}
