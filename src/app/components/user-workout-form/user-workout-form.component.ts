import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-user-workout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-workout-form.component.html',
  styleUrls: ['./user-workout-form.component.css']
})
export class UserWorkoutFormComponent implements OnInit {
  workoutForm: FormGroup;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Weightlifting', 'Hiking'];

  constructor(private fb: FormBuilder, private userDataService: UserDataService) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      workoutType: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const user = { name: this.workoutForm.value.name };
      const workout = {
        type: this.workoutForm.value.workoutType,
        minutes: this.workoutForm.value.minutes
      };
      this.userDataService.addWorkout(user, workout);
      this.workoutForm.reset();
    }
  }
}
