import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ParkingRecord, ParkingService } from '../parking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private dateSubject = new BehaviorSubject<Date | null>(null);
  selectedDate$ = this.dateSubject.asObservable();

  totalCarsParked$: Observable<number>;
  emptySlots$: Observable<number>;
  vehicleTypeCounts$: Observable<{ [key: string]: number }>;
  vehiclesParkedOverTwoHours$: Observable<ParkingRecord[]>;

  constructor(private parkingService: ParkingService) {
    this.totalCarsParked$ = this.selectedDate$.pipe(
      switchMap((date) =>
        this.parkingService.getTotalCarsParkedByDate(date || undefined)
      )
    );

    this.emptySlots$ = this.selectedDate$.pipe(
      switchMap((date) =>
        this.parkingService.getEmptySlotsByDate(date || undefined)
      )
    );

    this.vehicleTypeCounts$ = this.selectedDate$.pipe(
      switchMap((date) =>
        this.parkingService.getVehicleTypeCountsByDate(date || undefined)
      )
    );

    this.vehiclesParkedOverTwoHours$ = this.selectedDate$.pipe(
      switchMap((date) =>
        this.parkingService.getVehiclesParkedOverTwoHoursByDate(
          date || undefined
        )
      )
    );
  }

  ngOnInit(): void {}
  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedDate = input.value ? new Date(input.value) : null;
    this.dateSubject.next(selectedDate);
  }
}
