import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(private firestore: AngularFirestore) { }

  newCount(data: any) {
    return this.firestore.collection('Estrategia').add(data);
  }

  getCount(): Observable<any> {
    return this.firestore.collection('Estrategia').snapshotChanges();
  }

}
