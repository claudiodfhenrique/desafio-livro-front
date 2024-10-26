import { LivroAssunto } from "./livro-assunto.model";
import { LivroAutor } from "./livro-autor.model";

export interface Livro {
  cod: number;
  titulo: string;
  editora: string;
  edicao: number;
  anoPublicacao: number;
  livroAssunto: LivroAssunto[],
  livroAutor: LivroAutor[]
}