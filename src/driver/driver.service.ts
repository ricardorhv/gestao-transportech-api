import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(driver: any): Driver {
    return {
      id: driver.id,
      name: driver.name,
      lastName: driver.lastName,
      driverLicense: driver.driverLicense,
      document: driver.document,
      phone: driver.phone,
      isActive: driver.isActive,
      email: driver.email,
      password: driver.password,
      createdAt: driver.createdAt,
    }
  }

  async create(createDriverDto: CreateDriverDto) {
    const driverAlreadyExists = await this.prisma.driver.findFirst({
      select: {
        document: true,
        email: true
      },
      where: {
        OR: [
          {
            document: createDriverDto.document
          },
          {
            email: createDriverDto.email
          }
        ]
      }
    })

    if (driverAlreadyExists) {
      
      if (driverAlreadyExists.email === createDriverDto.email){
        throw new BadRequestException(`Already exists a driver with email ${createDriverDto.email}`)
      }

      if (driverAlreadyExists.document === createDriverDto.document){
        throw new BadRequestException(`Already exists a driver with document ${createDriverDto.document}`)
      }
    }

    const driver = await this.prisma.driver.create({
      data: {
        ...createDriverDto,
        isActive: true
      }
    })
    return driver;
  }

  async findAll(): Promise<Driver[]> {
    const drivers = await this.prisma.driver.findMany()
    return drivers.map(driver => this.mapToEntity(driver));
  }

  async findOne(id: string): Promise<Driver | null> {
    const driver = await this.prisma.driver.findFirst({
      where: {
        id
      }
    })

    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`)
    }

    return this.mapToEntity(driver);
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    const driver = await this.prisma.driver.findFirst({
      where: {
        id
      }
    })

    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`)
    }

    const userUpdated = await this.prisma.driver.update({
      data: updateDriverDto,
      where: {
        id
      }
    })

    return this.mapToEntity(userUpdated);
  }

  async remove(id: string) {
    const driver = await this.prisma.driver.findFirst({
      where: {
        id
      }
    })

    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`)
    }

    const deletedDriver = await this.prisma.driver.delete({
      where: {
        id
      }
    })

    return this.mapToEntity(deletedDriver);
  }
}
