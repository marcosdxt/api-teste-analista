import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";


export class EditaUsuarioDto {
    @IsNotEmpty({
        message: "Obrigatório informar o nome do usuário"
    })
    @IsString()
    nome: string;

    @IsNotEmpty({
        message: "Obrigatório informar o email do usuário"
    })
    @IsEmail()
    email: string;
}