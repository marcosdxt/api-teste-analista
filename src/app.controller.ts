import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { EditaUsuarioDto } from './edit-usuario.dto';
import { NovoUsuarioDto } from './novo-usuario.dto';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class AppController {
  private usuarios = new Map<string,Usuario>();

  constructor(private readonly appService: AppService) {}

  private adiciona_usuario(usuarioDto: NovoUsuarioDto):boolean {
      let new_user = new Usuario(usuarioDto.nome,usuarioDto.telefone,usuarioDto.email,true);

      if(!this.usuarios.has(usuarioDto.telefone)) {
          this.usuarios.set(usuarioDto.telefone,new_user);
          return true;
      }

      return false;
  }

  private list_usuarios(): Usuario[] {
    let usuarios:Usuario[] =  [];

    for(const usr of this.usuarios.values()) {
      usuarios.push(usr);
    }

    return usuarios;
  }

  private edita_usuario(telefone:string, dto: EditaUsuarioDto):boolean {

    if(this.usuarios.has(telefone)){

      let tmp = this.usuarios.get(telefone);
      tmp.nome  = dto.nome;
      tmp.email = dto.email;
      this.usuarios.set(telefone,tmp);
      return true;
    }    

    return false;
  }

  private remove_usuario(telefone:string): boolean {

    if(this.usuarios.has(telefone)) {

      this.usuarios.delete(telefone);
      return true;
    }

    return false;
  }

  @Post()
  public async add_user(@Body() dto:NovoUsuarioDto) {

      if(!this.adiciona_usuario(dto))
        throw new HttpException("Erro, usuário já cadastrado",400);
  }

  @Get()
  public async list_users() {

    const list = this.list_usuarios();

    if(!list.length)
      throw new HttpException("Sem registros",204);
    
    return list;
  }

  @HttpCode(201)
  @Put(':telefone')
  public async edit_user(@Param('telefone')telefone:string,@Body() dto:EditaUsuarioDto) {

      if(!this.edita_usuario(telefone,dto))
        throw new HttpException("Erro ao editar o usuário",400)      
  }

  @HttpCode(201)
  @Delete(':telefone')
  public async delete_user(@Param('telefone')telefone:string) {

      if(!this.remove_usuario(telefone))
        throw new HttpException("Usuario não encontrado",400);
  }

}
