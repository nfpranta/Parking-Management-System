import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ParkingRecord {
  id: number;
  ownerName: string;
  vehicleType: string;
  licenseNumber: string;
  entryDateTime: string;
  exitDateTime: string;
  status: string;
  ownerPhone: string;
  ownerAddress: string;
  parkingCharge: number;
}
@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private parkingRecords = new BehaviorSubject<ParkingRecord[]>([]);
  private idCounter = 1;
  private totalSlots = 100; // Assuming 100 total parking slots
  private filterRecordsByDate(
    records: ParkingRecord[],
    date: Date
  ): ParkingRecord[] {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return records.filter((record) => {
      const entryDate = new Date(record.entryDateTime);
      return entryDate >= startOfDay && entryDate <= endOfDay;
    });
  }
  getTotalCarsParkedByDate(date?: Date): Observable<number> {
    return this.parkingRecords.pipe(
      map((records) =>
        date ? this.filterRecordsByDate(records, date) : records
      ),
      map(
        (records) =>
          records.filter((record) => record.status === 'Parked').length
      )
    );
  }

  getEmptySlotsByDate(date?: Date): Observable<number> {
    return this.getTotalCarsParkedByDate(date).pipe(
      map((parkedCars) => this.totalSlots - parkedCars)
    );
  }

  getVehicleTypeCountsByDate(
    date?: Date
  ): Observable<{ [key: string]: number }> {
    return this.parkingRecords.pipe(
      map((records) =>
        date ? this.filterRecordsByDate(records, date) : records
      ),
      map((records) => {
        const counts: { [key: string]: number } = {};
        records.forEach((record) => {
          if (record.status === 'Parked') {
            counts[record.vehicleType] = (counts[record.vehicleType] || 0) + 1;
          }
        });
        return counts;
      })
    );
  }

  getVehiclesParkedOverTwoHoursByDate(
    date?: Date
  ): Observable<ParkingRecord[]> {
    return this.parkingRecords.pipe(
      map((records) =>
        date ? this.filterRecordsByDate(records, date) : records
      ),
      map((records) => {
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        return records.filter(
          (record) =>
            record.status === 'Parked' &&
            new Date(record.entryDateTime) < twoHoursAgo
        );
      })
    );
  }
  getParkingRecords() {
    return this.parkingRecords.asObservable();
  }

  addParkingRecord(record: Omit<ParkingRecord, 'id'>) {
    const newRecord = { ...record, id: this.idCounter++ };
    const currentRecords = this.parkingRecords.value;
    this.parkingRecords.next([...currentRecords, newRecord]);
  }
  editParkingRecord(updatedRecord: ParkingRecord) {
    const currentRecords = this.parkingRecords.value;
    const index = currentRecords.findIndex(
      (record) => record.id === updatedRecord.id
    );
    if (index !== -1) {
      currentRecords[index] = updatedRecord;
      this.parkingRecords.next([...currentRecords]);
    }
  }
  getTotalCarsParked(): Observable<number> {
    return this.parkingRecords.pipe(
      map(
        (records) =>
          records.filter((record) => record.status === 'Parked').length
      )
    );
  }

  getEmptySlots(): Observable<number> {
    return this.getTotalCarsParked().pipe(
      map((parkedCars) => this.totalSlots - parkedCars)
    );
  }

  getVehicleTypeCounts(): Observable<{ [key: string]: number }> {
    return this.parkingRecords.pipe(
      map((records) => {
        const counts: { [key: string]: number } = {};
        records.forEach((record) => {
          if (record.status === 'Parked') {
            counts[record.vehicleType] = (counts[record.vehicleType] || 0) + 1;
          }
        });
        return counts;
      })
    );
  }

  getVehiclesParkedOverTwoHours(): Observable<ParkingRecord[]> {
    return this.parkingRecords.pipe(
      map((records) => {
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        return records.filter(
          (record) =>
            record.status === 'Parked' &&
            new Date(record.entryDateTime) < twoHoursAgo
        );
      })
    );
  }
  constructor() {}
}
