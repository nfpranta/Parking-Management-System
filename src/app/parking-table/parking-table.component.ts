import { Component, OnInit } from '@angular/core';
import { ParkingRecord, ParkingService } from '../parking.service';

@Component({
  selector: 'app-parking-table',
  templateUrl: './parking-table.component.html',
  styleUrl: './parking-table.component.css',
})
export class ParkingTableComponent implements OnInit {
  parkingRecords: ParkingRecord[] = [];
  editingRecord: ParkingRecord | null = null;

  constructor(private parkingService: ParkingService) {}

  ngOnInit() {
    this.parkingService.getParkingRecords().subscribe((records) => {
      this.parkingRecords = records;
    });
  }
  startEditing(record: ParkingRecord) {
    this.editingRecord = { ...record };
  }

  saveEdit() {
    if (this.editingRecord) {
      this.parkingService.editParkingRecord(this.editingRecord);
      this.editingRecord = null;
    }
  }
  cancelEdit() {
    this.editingRecord = null;
  }
  private getTimeFromDateTime(dateTime: string): string {
    return dateTime ? dateTime.split('T')[1].substr(0, 5) : '';
  }

  private setTimeToDateTime(time: string): string {
    const today = new Date().toISOString().split('T')[0];
    return `${today}T${time}:00`;
  }
}
