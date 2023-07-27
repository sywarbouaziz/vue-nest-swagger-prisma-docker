import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, Max} from 'class-validator';


export class CreateUserDto {
  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  @IsNotEmpty({ message: 'First name should not be empty' })
  @IsString({ message: 'First name must be a string' })
  firstname: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  @IsNotEmpty({ message: 'Last name should not be empty' })
  @IsString({ message: 'Last name must be a string' })
  lastname: string;

  @ApiProperty({
    description: 'Age',
    example: 30,
  })
  @IsNotEmpty({ message: 'Age should not be empty' })
  @IsNumber({}, { message: 'Age must be a number' })
  @Min(0, { message: 'Age cannot be less than 0' })
  @Max(120, { message: 'Age cannot be greater than 120' })
  age: number;


}
