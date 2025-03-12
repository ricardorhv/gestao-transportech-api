import { IsEmail, IsString } from "class-validator";

export class CreateDriverDto {
  @IsString({
    message: 'Nome deve ser string'
  })
  name: string;

  @IsString({
    message: 'Sobrenome deve ser string'
  })
  lastName: string;

  @IsString({
    message: 'Documento do motorista deve ser string'
  })
  driverLicense: string;

  @IsString({
    message: 'Documento deve ser string'
  })
  document: string;

  @IsString({
    message: 'Telefone deve ser string'
  })
  phone: string;

  @IsString({
    message: 'Email deve ser uma string'
  })
  @IsEmail()
  email: string;

  @IsString({
    message: 'Senha deve ser uma string'
  })
  password: string;
}
