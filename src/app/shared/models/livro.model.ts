import { Assunto } from "./assunto.model";
import { Autor } from "./autor.model";

export interface Livro {
  cod: number;
  titulo: string;
  editora: string;
  edicao: number;
  anoPublicacao: number;
  assuntos: Assunto[],
  autores: Autor[]
}