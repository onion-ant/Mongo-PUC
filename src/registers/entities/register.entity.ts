import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Register {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phone: string;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
