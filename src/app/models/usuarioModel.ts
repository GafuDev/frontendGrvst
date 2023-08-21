export class Usuario {
  idUsuario?: number;
  nombre?: string;
  apellido?: string;
  username?: string;
  contrasena?: string;
  correo?: string;
  direccion?: string;
  idComuna?: number;
  idRegion?: number;
  idRol?: number;
  telefono?: number;
  createAt?: Date;
  updateAt?: Date;

  constructor(data: Partial<Usuario> = {}) {
    Object.assign(this, data);
  }
}
