import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EstrategiaService {
  constructor(private firestrore: AngularFirestore) {}

  newStrategy(data: any) {
    return this.firestrore.collection('Estrategia').add(data);
  }

  getStrategy(): Observable<any> {
    return this.firestrore.collection('Estrategia').snapshotChanges();
  }
}
