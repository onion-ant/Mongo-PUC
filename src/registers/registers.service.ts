import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Register } from './entities/register.entity';
import { Model } from 'mongoose';
import { ManyRegisterDto } from './dto/many-register.dto';
import { plainToInstance } from 'class-transformer';
import { OneRegisterDto } from './dto/one-register.dto';

@Injectable()
export class RegistersService {
  constructor(
    @InjectModel(Register.name) private registerModel: Model<Register>,
  ) {}
  async create(createRegisterDto: CreateRegisterDto): Promise<OneRegisterDto> {
    const newRegister = new this.registerModel(createRegisterDto);
    await newRegister.save();
    return plainToInstance(OneRegisterDto, newRegister, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ManyRegisterDto[]> {
    const registers = await this.registerModel.find().lean();
    return plainToInstance(ManyRegisterDto, registers, {
      excludeExtraneousValues: true,
    });
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
