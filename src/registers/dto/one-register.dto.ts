import { Expose } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { ExposeId } from 'src/decorators/exposeId.decorator';

export class OneRegisterDto {
  @ExposeId()
  _id: ObjectId;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phone: string;
}
