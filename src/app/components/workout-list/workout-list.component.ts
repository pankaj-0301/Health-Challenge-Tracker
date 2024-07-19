import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables, TooltipItem } from 'chart.js';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  @ViewChild('graphSection') graphSection!: ElementRef;

  users: any[] = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Weightlifting', 'Hiking'];
  searchName: string = '';
  filterWorkoutType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  selectedUser: any = null;
  private chart: Chart | null = null;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    // Subscribe to userData changes
    this.userDataService.userData$.subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
      this.updatePagination();
    });

    Chart.register(...registerables);
  }

  onSearch(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
    this.updatePagination();
  }

  onFilter(): void {
    this.filteredUsers = this.users.filter(user =>
      user.workouts.some((workout: any) => {
        const match = workout.type.toLowerCase().includes(this.filterWorkoutType.toLowerCase());
        console.log(`Workout Type: ${workout.type}, Filter: ${this.filterWorkoutType}, Match: ${match}`);
        return match;
      })
    );
    this.updatePagination();
  }
  

  resetFilters(): void {
    this.filteredUsers = this.users;
    this.searchName = '';
    this.filterWorkoutType = '';
    this.updatePagination();
  }

  getTotalMinutes(workouts: any[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.paginate();
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  selectUser(user: any): void {
    this.selectedUser = user;
    this.renderChart();
  }

  showGraphAnalysis(): void {
    this.selectedUser = null; // Clear selection
    this.clearChart(); // Clear chart when no user is selected
    this.scrollToGraphSection(); // Scroll to the graph section
  }

  clearChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  renderChart(): void {
    this.clearChart(); // Clear existing chart

    const ctx = document.getElementById('userGraph') as HTMLCanvasElement;
    const workouts = this.selectedUser?.workouts || [];
    const workoutTypes = [...new Set(workouts.map((w: any) => w.type))];
    const data = workoutTypes.map(type => {
      return workouts
        .filter((w: any) => w.type === type)
        .reduce((total: number, w: any) => total + w.minutes, 0);
    });

    this.chart = new Chart(ctx.getContext('2d')!, {
      type: 'bar',
      data: {
        labels: workoutTypes,
        datasets: [{
          label: 'Workout Minutes',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: TooltipItem<'bar'>) => `Minutes: ${tooltipItem.raw}`
            }
          }
        }
      }
    });
  }

  scrollToGraphSection(): void {
    if (this.graphSection) {
      this.graphSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
