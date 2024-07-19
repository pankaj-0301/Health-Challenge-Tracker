import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData = new BehaviorSubject<any[]>([]);
  userData$ = this.userData.asObservable();

  constructor() {
    const initialData = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 }
        ]
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      },
      {
        id: 4,
        name: 'Emily Davis',
        workouts: [
          { type: 'Weightlifting', minutes: 70 },
          { type: 'Running', minutes: 25 }
        ]
      },
      {
        id: 5,
        name: 'Chris Lee',
        workouts: [
          { type: 'Hiking', minutes: 90 },
          { type: 'Swimming', minutes: 30 }
        ]
      },
      {
        id: 6,
        name: 'Anna Kim',
        workouts: [
          { type: 'Cycling', minutes: 55 },
          { type: 'Yoga', minutes: 40 }
        ]
      },
      {
        id: 7,
        name: 'David Brown',
        workouts: [
          { type: 'Running', minutes: 35 },
          { type: 'Weightlifting', minutes: 60 }
        ]
      },
      {
        id: 8,
        name: 'Sophia Martinez',
        workouts: [
          { type: 'Swimming', minutes: 45 },
          { type: 'Hiking', minutes: 80 }
        ]
      },
      {
        id: 9,
        name: 'James Wilson',
        workouts: [
          { type: 'Yoga', minutes: 30 },
          { type: 'Cycling', minutes: 50 }
        ]
      },
      {
        id: 10,
        name: 'Mia Clark',
        workouts: [
          { type: 'Running', minutes: 40 },
          { type: 'Weightlifting', minutes: 65 }
        ]
      }
    ];
    localStorage.setItem('userData', JSON.stringify(initialData));
    this.userData.next(initialData);
  }

  addWorkout(user: any, workout: any): void {
    const users = JSON.parse(localStorage.getItem('userData') || '[]');
    const existingUser = users.find((u: any) => u.name === user.name);

    if (existingUser) {
      existingUser.workouts.push(workout);
    } else {
      users.push({
        id: users.length + 1,
        name: user.name,
        workouts: [workout]
      });
    }

    localStorage.setItem('userData', JSON.stringify(users));
    this.userData.next(users);
  }
}
