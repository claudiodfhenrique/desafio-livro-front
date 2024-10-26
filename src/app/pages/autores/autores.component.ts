import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AutorService } from '../../shared/services/autor.service';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Autor } from '../../shared/models/autor.model';
import { MatPaginatorIntlonf } from '../../shared/injectors/mat-paginator-intl-conf.injector';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-autores',
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
    MatIconModule
  ],
  providers: [
    AutorService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlonf }
  ],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent implements OnInit  {
  public isLoading = signal(false);

  public isLoadingTable = signal(true);

  public formGroup: FormGroup;

  public displayedColumns: string[] = ['codAu', 'nome', 'acoes'];

  public dataSource!: MatTableDataSource<Autor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private service: AutorService,
    private snackBar: MatSnackBar) {
    this.formGroup = this.fb.group({
      codAu: [],
      nome: [null, [Validators.required, Validators.maxLength(100)]]
    });
  }

  async ngOnInit(): Promise<void> {    
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    const data = await lastValueFrom(this.service.all());
    this.dataSource = new MatTableDataSource<Autor>(data);    
    this.dataSource!.paginator = this.paginator;    
    this.isLoadingTable.set(false);
  }

  public async delete(codAu: number): Promise<void> {    
    await lastValueFrom(this.service.delete(codAu));    
    this.snackBar.open('Autor excluído com sucesso!', 'fechar');
    await this.loadData();    
    this.formGroup.markAsPristine();
  }

  public edit(autor: Autor) : void {
    this.formGroup.patchValue(autor);
  }

  private async create(autor: Autor): Promise<void> {
    await lastValueFrom(this.service.create(autor));    
    this.snackBar.open('Autor cadastrado com sucesso!', 'fechar');
  }

  private async update(autor: Autor): Promise<void> {
    await lastValueFrom(this.service.put(autor));    
    this.snackBar.open('Autor atualizado com sucesso!', 'fechar');
  }

  async save(): Promise<void> {
    if (this.formGroup.valid) {
      const model = this.formGroup.value as Autor;
      this.isLoading.set(true);

      if (model.codAu) {
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
