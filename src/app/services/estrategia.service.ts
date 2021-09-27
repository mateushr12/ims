import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EstrategiaService {
  constructor(private firestore: AngularFirestore) {}

  newStrategy(data: any) {
    return this.firestore.collection('Estrategia').add(data);
  }

  getStrategy(): Observable<any> {
    return this.firestore.collection('Estrategia').snapshotChanges();
  }

  editStrategy(id: any,record: any) {
    return this.firestore.doc('Estrategia/'+id).update(record)
  }

  deleteStrategy(id: any) {    
    return this.firestore.collection('Estrategia').doc(id).delete();          
  }
}
