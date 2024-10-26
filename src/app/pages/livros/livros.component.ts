import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LivroService } from '../../shared/services/livro.service';
import { lastValueFrom } from 'rxjs';
import { Livro } from '../../shared/models/livro.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntlonf } from '../../shared/injectors/mat-paginator-intl-conf.injector';
import { MatIconModule } from '@angular/material/icon';
import { AutorService } from '../../shared/services/autor.service';
import { MatSelectModule } from '@angular/material/select';
import { Autor } from '../../shared/models/autor.model';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginator,
    MatPaginatorModule,    
    MatTableModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [
    LivroService,
    AutorService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlonf }
  ],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent implements OnInit { 
  public isLoading = signal(false);
  
  public isLoadingTable = signal(true);

  public formGroup: FormGroup;

  public displayedColumns: string[] = ['cod', 'titulo', 'editora', 'edicao', 'anoPublicacao', 'acoes'];

  public dataSource!: MatTableDataSource<Livro>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  autores: Autor[] = [];  

  constructor(
    private fb: FormBuilder,
    private service: LivroService,
    private autorService: AutorService,
    private snackBar: MatSnackBar) {
    this.formGroup = this.fb.group({
      cod: [],
      titulo: [null, [Validators.required, Validators.maxLength(100)]],
      editora: [null, [Validators.required, Validators.maxLength(100)]],
      edicao: [null, Validators.required],
      anoPublicacao: [null, [Validators.required, Validators.min(1900)]],      
      livroAutores: [null],
    });
  }

  async ngOnInit(): Promise<void> {    
    await this.loadData();
    this.autores = await lastValueFrom(this.autorService.all());
  }

  private async loadData(): Promise<void> {
    const data = await lastValueFrom(this.service.all());
    this.dataSource = new MatTableDataSource<Livro>(data);    
    this.dataSource!.paginator = this.paginator;    
    this.isLoadingTable.set(false);
  }

  public async delete(codAu: number): Promise<void> {    
    await lastValueFrom(this.service.delete(codAu));    
    this.snackBar.open('Livro excluído com sucesso!', 'fechar');
    await this.loadData();    
    this.formGroup.markAsPristine();
  }

  public edit(autor: Livro) : void {
    this.formGroup.patchValue(autor);
  }

  private async create(autor: Livro): Promise<void> {
    await lastValueFrom(this.service.create(autor));    
    this.snackBar.open('Livro cadastrado com sucesso!', 'fechar');
  }

  private async update(autor: Livro): Promise<void> {
    await lastValueFrom(this.service.put(autor));    
    this.snackBar.open('Livro atualizado com sucesso!', 'fechar');
  }

  async save(): Promise<void> {
    if (this.formGroup.valid) {
      const model = this.formGroup.value as Livro;
      this.isLoading.set(true);

      if (model.cod) {
        await this.update(model);
      }
      else {
        await this.create(model);
      }
      
      this.isLoading.set(false);
      this.formGroup.reset();
      await this.loadData();
    }
  }
}
