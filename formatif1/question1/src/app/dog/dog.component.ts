import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-dog',
    templateUrl: './dog.component.html',
    styleUrls: ['./dog.component.css'],
    standalone: true,
    imports: [MatCardModule]
})
export class DogComponent {

}
