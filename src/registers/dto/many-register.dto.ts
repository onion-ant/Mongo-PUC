import { Expose } from 'class-transformer';
import { ExposeId } from 'src/decorators/exposeId.decorator';

export class ManyRegisterDto {
  @ExposeId()
  _id: string;
  @Expose()
  name: string;
}
