import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: '+1234567890',
    description: 'Номер телефона пользователя',
  })
  phone: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Электронная почта пользователя',
  })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
  password: string;
}

export class LoginDto {
  @ApiProperty({
    example: '+1234567890',
    description: 'Номер телефона пользователя',
  })
  phone: string;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
  password: string;
}

export class ConfirmEmailDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Электронная почта пользователя',
  })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Код подтверждения, отправленный на email',
  })
  code: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    example: '+1234567890',
    description: 'Номер телефона пользователя',
  })
  phone: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    example: '+1234567890',
    description: 'Номер телефона пользователя',
  })
  phone: string;

  @ApiProperty({
    example: '123456',
    description: 'Код сброса пароля, отправленный на email',
  })
  code: string;

  @ApiProperty({ example: 'newpassword123', description: 'Новый пароль' })
  newPassword: string;
}
