import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { UserDataService } from '../../services/user-data.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let userDataService: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserDataService', ['userData$']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [WorkoutListComponent],
      providers: [
        { provide: UserDataService, useValue: spy }
      ]
    }).compileComponents();

    userDataService = TestBed.inject(UserDataService) as jasmine.SpyObj<UserDataService>;
    userDataService.userData$.and.returnValue(of([
      { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane', workouts: [{ type: 'Cycling', minutes: 45 }] }
    ]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users by name', () => {
    component.searchName = 'John';
    component.onSearch();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('John');
  });

  it('should filter users by workout type', () => {
    component.filterWorkoutType = 'Cycling';
    component.onFilter();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Jane');
  });

  it('should reset filters', () => {
    component.searchName = 'John';
    component.filterWorkoutType = 'Cycling';
    component.resetFilters();
    expect(component.filteredUsers.length).toBe(2);
  });

  it('should render chart on user selection', () => {
    const user = { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 30 }] };
    component.selectUser(user);
    fixture.detectChanges();
    const chartElement = fixture.debugElement.query(By.css('canvas#userGraph'));
    expect(chartElement).toBeTruthy();
  });
});
