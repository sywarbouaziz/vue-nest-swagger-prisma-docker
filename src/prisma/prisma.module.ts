import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // Include PrismaService as a provider
  exports: [PrismaService], // Export PrismaService if needed by other modules
})
export class PrismaModule {}
