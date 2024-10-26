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
import { AssuntoService } from '../../shared/services/assunto.service';
import { lastValueFrom } from 'rxjs';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntlonf } from '../../shared/injectors/mat-paginator-intl-conf.injector';
import { Assunto } from '../../shared/models/assunto.model';

@Component({
  selector: 'app-assuntos',
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
    AssuntoService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlonf }
  ],
  templateUrl: './assuntos.component.html',
  styleUrl: './assuntos.component.css'
})
export class AssuntosComponent implements OnInit {
  public isLoading = signal(false);  

  public isLoadingTable = signal(true);

  public formGroup: FormGroup;

  public displayedColumns: string[] = ['codAss', 'descricao', 'acoes'];

  public dataSource!: MatTableDataSource<Assunto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private service: AssuntoService,
    private snackBar: MatSnackBar) {
    this.formGroup = this.fb.group({
      codAss: [],
      descricao: [null, [Validators.required, Validators.maxLength(100)]]
    });
  }

  async ngOnInit(): Promise<void> {    
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    const data = await lastValueFrom(this.service.all());
    this.dataSource = new MatTableDataSource<Assunto>(data);    
    this.dataSource!.paginator = this.paginator;    
    this.isLoadingTable.set(false);
  }

  public async delete(codAu: number): Promise<void> {    
    await lastValueFrom(this.service.delete(codAu));    
    this.snackBar.open('Assunto excluído com sucesso!', 'fechar');
    await this.loadData();    
    this.formGroup.markAsPristine();
  }

  public edit(autor: Assunto) : void {
    this.formGroup.patchValue(autor);
  }

  private async create(autor: Assunto): Promise<void> {
    await lastValueFrom(this.service.create(autor));    
    this.snackBar.open('Assunto cadastrado com sucesso!', 'fechar');
  }

  private async update(autor: Assunto): Promise<void> {
    await lastValueFrom(this.service.put(autor));    
    this.snackBar.open('Assunto atualizado com sucesso!', 'fechar');
  }

  async save(): Promise<void> {
    if (this.formGroup.valid) {
      const model = this.formGroup.value as Assunto;
      this.isLoading.set(true);

      if (model.codAss) {
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
