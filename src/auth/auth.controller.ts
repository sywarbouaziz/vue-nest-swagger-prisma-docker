import { Body, Controller, Get, Param, Post, Patch, Delete, ParseIntPipe, NotFoundException, ConflictException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiConflictResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDto } from 'src/dto/update_user.dto';

@Controller('User')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Get()
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  getAllPeople() {
    return this.userService.getAllPeople();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'User not found' })
  getUserById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  @UsePipes(new ValidationPipe({transform:true}))
  @ApiCreatedResponse({ type: UserEntity, description: 'The user has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiConflictResponse({ description: 'User with the same ID already exists' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new ConflictException('User with the same ID already exists');
    }
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'User not found' })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUser(Number(id), updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.deleteUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
