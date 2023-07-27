import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), HttpModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}