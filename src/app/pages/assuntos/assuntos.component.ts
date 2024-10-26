import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AssuntoService } from '../../shared/services/assunto.service';
import { AutorService } from '../../shared/services/autor.service';
import { lastValueFrom } from 'rxjs';

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
  ],
  providers: [
    AssuntoService
  ],
  templateUrl: './assuntos.component.html',
  styleUrl: './assuntos.component.css'
})
export class AssuntosComponent implements OnInit {
public isLoading = signal(false);
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AssuntoService,
    private snackBar: MatSnackBar) {
    this.formGroup = this.fb.group({
      descricao: [null, [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {    
  }

  async save(): Promise<void> {
    if (this.formGroup.valid) {
      this.isLoading.set(true);
      await lastValueFrom(this.service.create(this.formGroup.value));
      this.isLoading.set(false);
      this.snackBar.open('Assunto cadastrado com sucesso!');
      this.formGroup.markAsPristine();
      this.formGroup.reset();
    }
  }
}
