import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
  RegisterDto,
  LoginDto,
  ConfirmEmailDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from './mailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { phone, email, password } = registerDto;

    const userExists = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });

    if (userExists) {
      throw new BadRequestException(
        'User with this phone or email already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      phone,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    const confirmationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    await this.mailerService.sendConfirmationEmail(email, confirmationCode);

    newUser.confirmationCode = confirmationCode;
    await this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto) {
    const { phone, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { phone } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async confirmEmail(confirmEmailDto: ConfirmEmailDto) {
    const { email, code } = confirmEmailDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || user.confirmationCode !== code) {
      throw new BadRequestException('Invalid confirmation code');
    }

    user.isEmailConfirmed = true;
    await this.userRepository.save(user);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { phone } = forgotPasswordDto;
    const user = await this.userRepository.findOne({ where: { phone } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    await this.mailerService.sendResetPasswordEmail(user.email, resetCode);

    user.resetPasswordCode = resetCode;
    await this.userRepository.save(user);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { phone, code, newPassword } = resetPasswordDto;
    const user = await this.userRepository.findOne({ where: { phone } });

    if (!user || user.resetPasswordCode !== code) {
      throw new BadRequestException('Invalid reset code');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordCode = null;
    await this.userRepository.save(user);
  }
}
