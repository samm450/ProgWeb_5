import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, FormGroup, MinLengthValidator } from '@angular/forms';
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
        comments : ['', [Validators.minLength(10), ]]
      }
    )

    
  }
  export function Commentaire() : ValidationFn{
    
    return (control : AbstractControl) : ValidationErrors | null => {
      const comment = control.get('comments')
      if (!comment?.value){
        // a continuer
      }
      else return null
    }
  }
}


