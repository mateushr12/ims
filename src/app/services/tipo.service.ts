import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private firestore: AngularFirestore) { }

  newType(data: any) {
    return this.firestore.collection('Tipo').add(data);
  }

  getType(): Observable<any> {
    return this.firestore.collection('Tipo').snapshotChanges();
  }
  
}
