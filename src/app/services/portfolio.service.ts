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

  getOperation(): Observable<any> {
    return this.firestore.collection('Portfolio').snapshotChanges();
  }
  
  editOperation(id: any,record: any) {
    return this.firestore.doc('Portfolio/'+id).update(record)
  }

  deleteOperation(id: any) {    
    return this.firestore.collection('Portfolio').doc(id).delete();          
  }

}
