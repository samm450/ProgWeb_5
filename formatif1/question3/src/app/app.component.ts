import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, FormGroup, MinLengthValidator, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AppComponent {
  title = 'reactive.form';
  formGroup : FormGroup;

  constructor(private formBuilder : FormBuilder) { 
    this.formGroup = this.formBuilder.group(
      {
        name : ['', [Validators.required]],
        roadnumber : ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
        postalcode : ['', [Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")] ],
        comments : ['', [this.Commentaire()]]
      },
      { validators: this.nomCommentaire() }
    );
  }

  Commentaire() : ValidatorFn{
    return (control : AbstractControl) : ValidationErrors | null => {
      const comment = control.value;

      if(!comment){
        return null
      }

      const estvalide = comment.split(' ').length >= 10;
      
      return estvalide ? null : {Commentaire : true};
    
    }
  }

  nomCommentaire(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // On récupère les valeurs de nos champs textes
      const comment = control.get('comments');
      const nom = control.get('nom');
      // On regarde si les champs sont remplis avant de faire la validation
      if (!comment?.value || !nom?.value) {
        return null;
      }
      // On fait notre validation
      const estValide = !comment.value.includes(nom.value);

      if (!estValide) {
        // On ajoute l'erreur pour l'afficher sous le champ courriel
        // On conserve les autres erreurs déjà présentes
        comment.setErrors({ ...comment.errors, nomCommentaire : true });
      }
      return estValide ? null : { nomCommentaire: true };
    };
  }  
  
}