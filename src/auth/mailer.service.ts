import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.timeweb.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendConfirmationEmail(email: string, code: string) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Подтверждение по электронной почте',
      text: `Ваш код подтверждения: ${code}`,
    });
  }

  async sendResetPasswordEmail(email: string, code: string) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Сброс пароля',
      text: `Ваш код для сброса пароля: ${code}`,
    });
  }
}
