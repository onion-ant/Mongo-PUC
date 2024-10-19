import { Expose } from 'class-transformer';
import { ExposeId } from 'src/decorators/exposeId.decorator';

export class FindAllRegisterDto {
  registers: ManyRegisterDto[];
  registersCount: number;
}

export class ManyRegisterDto {
  @ExposeId()
  _id: string;
  @Expose()
  name: string;
}

export class OneRegisterDto {
  @ExposeId()
  _id: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phone: string;
}
