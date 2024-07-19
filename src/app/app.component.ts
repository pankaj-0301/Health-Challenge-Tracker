import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserWorkoutFormComponent } from './components/user-workout-form/user-workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserWorkoutFormComponent, WorkoutListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'healthcare-app';
  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    // Initialization handled by the service
  }
}
