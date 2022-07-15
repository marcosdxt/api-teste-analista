import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

const brazil_phone_number = "^[5]{2}[1-9]{2}[9]{1}[0-9]{8}$"

export class NovoUsuarioDto {
    @IsNotEmpty({
        message: "Obrigatório informar o nome do usuário"
    })
    @IsString()
    nome: string;

    @IsNotEmpty()
    @Matches(
        brazil_phone_number,
        "",{
        message: "Obrigatório informar o telefone com DDI(55)+DDD(XX)+Numero com 9 digitos"
    })
    telefone: string;

    @IsNotEmpty({
        message: "Obrigatório informar o email do usuário"
    })
    @IsEmail()
    email: string;
}