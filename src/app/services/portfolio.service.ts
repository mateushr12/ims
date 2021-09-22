import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,  
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor(private firestore: AngularFirestore) {}

  newOperation(data: any) {
    return this.firestore.collection('Portfolio').add(data);
  }

  editOperation() {}

  deleteOperation() {}

  getOperation(): Observable<any> {
    return this.firestore.collection('Portfolio').snapshotChanges();
  }
}
