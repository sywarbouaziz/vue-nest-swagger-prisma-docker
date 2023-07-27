import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module'; // Import the PrismaModule

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule], // Import the PrismaModule
})
export class AuthModule {}
