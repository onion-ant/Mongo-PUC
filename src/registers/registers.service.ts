import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Register } from './entities/register.entity';
import { isValidObjectId, Model } from 'mongoose';
import { ManyRegisterDto } from './dto/many-register.dto';
import { plainToInstance } from 'class-transformer';
import { OneRegisterDto } from './dto/one-register.dto';
import { FindAllRegisterDto } from './dto/findAll-register.dto';

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
