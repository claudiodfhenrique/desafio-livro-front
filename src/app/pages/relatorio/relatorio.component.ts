import { Component, signal, ViewChild } from '@angular/core';
import { RelatorioService } from '../../shared/services/relatorio.service';
import { MatPaginatorIntlonf } from '../../shared/injectors/mat-paginator-intl-conf.injector';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Relatorio } from '../../shared/models/relatorio.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,    
    MatButtonModule,    
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginator,
    MatPaginatorModule,    
    MatTableModule,
    MatIconModule
  ],
  providers: [
    RelatorioService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlonf }
  ],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css'
})
export class RelatorioComponent {
  public isLoadingTable = signal(true);

  public displayedColumns: string[] = ['id', 'titulo', 'editora', 'edicao', 'assunto', 'autorNome'];

  public dataSource!: MatTableDataSource<Relatorio>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: RelatorioService) {}

  async ngOnInit(): Promise<void> {    
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    const data = await lastValueFrom(this.service.all());
    this.dataSource = new MatTableDataSource<Relatorio>(data);    
    this.dataSource!.paginator = this.paginator;    
    this.isLoadingTable.set(false);
  }
}
