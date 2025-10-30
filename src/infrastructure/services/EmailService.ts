import nodemailer from 'nodemailer';
import { UserRepository } from '../repositories/UserRepository';
import { GlobalConfig } from '../../application/config/globalConfig';


export default class EmailService {
  constructor(private userRepository: UserRepository, private globalConfig: GlobalConfig) {}

  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: this.globalConfig.emailUser,
      pass: this.globalConfig.emailPass,
    },
  });

  private async findUserById(userId: string) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    return user;
  }

  private async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: `HEFC <${this.globalConfig.emailUser}>`,
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email enviado para ${to}`);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw new Error('Erro ao enviar email.');
    }
  }

  async sendResetPasswordEmail(userId: string, resetLink: string) {
    const user = await this.findUserById(userId);
    const subject = 'Redefinir sua senha';
    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Redefinir Senha</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 50px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333333;
          font-size: 24px;
        }
        p {
          color: #555555;
          line-height: 1.6;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          color: #ffffff !important;
          background-color: #0066cc;
          text-decoration: none;
          border-radius: 5px;
        }
        .button:hover {
          background-color: #005bb5;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Redefinir sua senha</h1>
        <p>Olá,</p>
        <p>Você solicitou a redefinição de sua senha no site <strong>Hospital Espírita Fabiano de Cristo (HEFC)</strong>. Por favor, clique no botão abaixo para redefinir sua senha:</p>
        <p><a href="${resetLink}" target="_blank" class="button">Redefinir Senha</a></p>
        <p>Se você não solicitou essa redefinição, ignore este e-mail.</p>
        <p>Atenciosamente,<br>Equipe HEFC</p>        
      </div>
    </body>
    </html>
  `;

    await this.sendEmail(user.email, subject, html);
  }
}
