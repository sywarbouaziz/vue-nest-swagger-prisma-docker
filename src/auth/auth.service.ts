import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update_user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  
  getAllPeople() {
    return this.prisma.user.findMany();
  }

 getUserById(id: number){
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

 createUser(createUserDto:CreateUserDto){
    return this.prisma.user.create({
      data:createUserDto
    });
  }

   updateUser(id: number, updateUserDto:UpdateUserDto){
    return this.prisma.user.update({
      where: { id },
      data:updateUserDto,
    });
  }

  deleteUser(id: number){
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
