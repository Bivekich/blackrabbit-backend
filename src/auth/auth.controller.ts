import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  ConfirmEmailDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные или пользователь уже существует',
  })
  @ApiBody({ type: RegisterDto })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно вошел в систему',
  })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('confirm-email')
  @ApiOperation({ summary: 'Подтверждение электронной почты' })
  @ApiResponse({ status: 200, description: 'Email успешно подтвержден' })
  @ApiResponse({ status: 400, description: 'Некорректный код подтверждения' })
  @ApiBody({ type: ConfirmEmailDto })
  confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    return this.authService.confirmEmail(confirmEmailDto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Запрос на сброс пароля' })
  @ApiResponse({
    status: 200,
    description: 'Код сброса пароля отправлен на почту',
  })
  @ApiResponse({ status: 400, description: 'Пользователь не найден' })
  @ApiBody({ type: ForgotPasswordDto })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Сброс пароля' })
  @ApiResponse({ status: 200, description: 'Пароль успешно изменен' })
  @ApiResponse({
    status: 400,
    description: 'Некорректный код подтверждения или телефон',
  })
  @ApiBody({ type: ResetPasswordDto })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
