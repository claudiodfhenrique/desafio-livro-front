import { Component, OnInit, signal } from '@angular/core';
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
  ],
  providers: [
    AutorService
  ],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent implements OnInit {
  public isLoading = signal(false);
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AutorService,
    private snackBar: MatSnackBar) {
    this.formGroup = this.fb.group({
      nome: [null, [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {    
  }

  async save(): Promise<void> {
    if (this.formGroup.valid) {
      this.isLoading.set(true);
      await lastValueFrom(this.service.create(this.formGroup.value));
      this.isLoading.set(false);
      this.snackBar.open('Autor cadastrado com sucesso!');
      this.formGroup.markAsPristine();
      this.formGroup.reset();
    }
  }
}
