import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-cat',
    templateUrl: './cat.component.html',
    styleUrls: ['./cat.component.css'],
    standalone: true,
    imports: [MatCardModule]
})
export class CatComponent {

}
