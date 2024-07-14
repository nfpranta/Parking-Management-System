import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParkingRecord, ParkingService } from '../parking.service';
@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrl: './parking-form.component.css',
  standalone: true,
  imports: [FormsModule],
})
export class ParkingFormComponent {
  parkingRecord: Omit<ParkingRecord, 'id'> = {
    ownerName: '',
    vehicleType: '',
    licenseNumber: '',
    entryDateTime: '',
    exitDateTime: '',
    status: 'Parked',
    ownerPhone: '',
    ownerAddress: '',
    parkingCharge: 0,
  };
  constructor(private parkingService: ParkingService) {}
  onSubmit() {
    this.parkingService.addParkingRecord(this.parkingRecord);
    this.resetForm();
  }
  resetForm() {
    this.parkingRecord = {
      ownerName: '',
      vehicleType: '',
      licenseNumber: '',
      entryDateTime: '',
      exitDateTime: '',
      status: 'Parked',
      ownerPhone: '',
      ownerAddress: '',
      parkingCharge: 0,
    };
  }
}
