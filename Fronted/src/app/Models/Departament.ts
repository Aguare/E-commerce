export class Departament {
  nombre: string;
  municipios: string[];

  constructor(nombre: string, municipios: string[]) {
    this.nombre = nombre;
    this.municipios = municipios;
  }
}
