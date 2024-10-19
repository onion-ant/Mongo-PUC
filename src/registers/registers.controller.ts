import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegistersService } from './registers.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';

@Controller('registers')
export class RegistersController {
  constructor(private readonly registersService: RegistersService) {}

  @Post()
  async create(@Body() createRegisterDto: CreateRegisterDto) {
    return await this.registersService.create(createRegisterDto);
  }

  @Get()
  async findAll() {
    return await this.registersService.findAll();
  }

  @Get('countByEmail')
  async countByEmail() {
    return await this.registersService.countByEmail();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.registersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRegisterDto: UpdateRegisterDto,
  ) {
    return await this.registersService.update(id, updateRegisterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.registersService.remove(id);
  }
}
