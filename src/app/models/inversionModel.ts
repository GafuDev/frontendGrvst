export class Inversion {
  idInversion?: number;
  montoInversion?: number;
  fechaInversion?: Date;
  idUsuario?: number;
  idProyecto?: number;
  createAt?: Date;
  updateAt?: Date;
  
  constructor(data: Partial<Inversion> = {}) {
    Object.assign(this, data);
  }
}
