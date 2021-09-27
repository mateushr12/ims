import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(private firestore: AngularFirestore) { }

  newCount(data: any) {
    return this.firestore.collection('Conta').add(data);
  }

  getCount(): Observable<any> {
    return this.firestore.collection('Conta').snapshotChanges();
  }

  editCount(id: any,record: any) {
    return this.firestore.doc('Conta/'+id).update(record)
  }

  deleteCount(id: any) {    
    return this.firestore.collection('Conta').doc(id).delete();          
  }

}
