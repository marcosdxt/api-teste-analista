export class Usuario {
    nome: string;
    telefone: string;
    email: string;
    ativo: boolean;

    constructor(nome:string,telefone:string,email:string,ativo:boolean){
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.ativo = ativo;
    }

    public equals(usuario:Usuario):boolean {

        if(this.nome     === usuario.nome &&
           this.telefone === usuario.telefone &&
           this.email    === usuario.email) {

            return true;
        }

        return false;
    }
}