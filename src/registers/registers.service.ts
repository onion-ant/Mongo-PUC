import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Register } from './entities/register.entity';
import { Model } from 'mongoose';

@Injectable()
export class RegistersService {
  constructor(
    @InjectModel(Register.name) private registerModel: Model<Register>,
  ) {}
  async create(createRegisterDto: CreateRegisterDto): Promise<Register> {
    const newRegister = new this.registerModel(createRegisterDto);
    return await newRegister.save();
  }

  findAll() {
    return `This action returns all registers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} register`;
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} register`;
  }

  remove(id: number) {
    return `This action removes a #${id} register`;
  }
}
