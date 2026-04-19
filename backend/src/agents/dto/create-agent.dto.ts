import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateAgentDto {
  @ApiProperty({
    example: 'Umut Diyar Balcı',
    description: 'Temsilci Adı Soyadı',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName!: string;

  @ApiPropertyOptional({
    example: 'umutdiyarbalci@gmail.com',
    description: 'Temsilci E-posta Adresi',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Temsilci Aktiflik Durumu',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
