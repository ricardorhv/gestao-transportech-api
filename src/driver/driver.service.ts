import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

const drivers: Driver[] = [];

@Injectable()
export class DriverService {
  constructor(private prisma: PrismaService) {}

  create(createDriverDto: CreateDriverDto) {
    const driver = this.prisma.driver.create({
      data: {
        ...createDriverDto,
        isActive: true
      }
    })

    return driver;
  }

  findAll() {
    const drivers = this.prisma.driver.findMany();
    return drivers;
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
