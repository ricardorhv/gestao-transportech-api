import { Injectable } from '@nestjs/common';
import { prisma } from 'src/lib/prisma';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

const drivers: Driver[] = [];

@Injectable()
export class DriverService {
  create(createDriverDto: CreateDriverDto) {
    const driver = prisma.driver.create({
      data: {
        ...createDriverDto,
        isActive: true
      }
    })

    return driver;
  }

  findAll() {
    const drivers = prisma.driver.findMany();
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
