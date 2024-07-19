import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkoutFormComponent } from './user-workout-form.component';

describe('UserWorkoutFormComponent', () => {
  let component: UserWorkoutFormComponent;
  let fixture: ComponentFixture<UserWorkoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWorkoutFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
