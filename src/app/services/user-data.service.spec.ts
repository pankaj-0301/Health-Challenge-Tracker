import { TestBed } from '@angular/core/testing';
import { UserDataService } from './user-data.service';
import { BehaviorSubject } from 'rxjs';

describe('UserDataService', () => {
  let service: UserDataService;
  const mockUserData = [
    { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 30 }] },
    { id: 2, name: 'Jane', workouts: [{ type: 'Cycling', minutes: 45 }] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
    (service as any).userDataSubject = new BehaviorSubject(mockUserData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data', (done: DoneFn) => {
    service.userData$.subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUserData);
      done();
    });
  });

  it('should update user data', (done: DoneFn) => {
    const newUserData = [
      { id: 3, name: 'Tom', workouts: [{ type: 'Swimming', minutes: 25 }] }
    ];
    service.updateUserData(newUserData);
    service.userData$.subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(newUserData);
      done();
    });
  });
});
