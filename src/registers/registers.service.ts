import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Register } from './entities/register.entity';
import { isValidObjectId, Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { countByEmailRegisterDto } from './dto/countByEmail-register.dto';
import {
  FindAllRegisterDto,
  ManyRegisterDto,
  OneRegisterDto,
} from './dto/get-register.dots';

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

  async findAll(): Promise<FindAllRegisterDto> {
    const registers = await this.registerModel.find().lean().exec();
    const response = new FindAllRegisterDto();
    response.registers = plainToInstance(ManyRegisterDto, registers, {
      excludeExtraneousValues: true,
    });
    response.registersCount = await this.registerModel.countDocuments();
    return response;
  }

  async countByEmail(): Promise<countByEmailRegisterDto[]> {
    const registers = await this.registerModel
      .aggregate([{ $group: { _id: '$email', count: { $sum: 1 } } }])
      .exec();
    return registers.map((register) => {
      const response = new countByEmailRegisterDto();
      response.email = register._id;
      response.registersCount = register.count;
      return response;
    });
  }

  async findOne(id: string): Promise<OneRegisterDto> {
    if (!isValidObjectId(id))
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    const register = await this.registerModel.findById(id).exec();
    if (register == undefined)
      throw new HttpException('Register not found', HttpStatus.NOT_FOUND);
    return plainToInstance(OneRegisterDto, register, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateRegisterDto: UpdateRegisterDto,
  ): Promise<OneRegisterDto> {
    if (!isValidObjectId(id))
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    const upToDateRegister = await this.registerModel
      .findByIdAndUpdate(id, updateRegisterDto, { new: true })
      .exec();
    return plainToInstance(OneRegisterDto, upToDateRegister, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<OneRegisterDto> {
    if (!isValidObjectId(id))
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    const deletedRegister = await this.registerModel
      .findByIdAndDelete(id)
      .exec();
    return plainToInstance(OneRegisterDto, deletedRegister, {
      excludeExtraneousValues: true,
    });
  }
}
