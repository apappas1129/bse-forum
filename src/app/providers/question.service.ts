import { AuthenticationService } from './auth.service';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AngularFirestore } from "@angular/fire/firestore";
import { firestore } from 'firebase/app';

import { IQuestion, Question } from "../models/question.model";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  private collectionReference = this.ngFirestore.collection<IQuestion>("/questions/");

  constructor(private ngFirestore: AngularFirestore, private authService: AuthenticationService,) {
  }

  getList() {
    return this.collectionReference.valueChanges();
  }

  get(documentId: string): Observable<IQuestion> {
    return this.collectionReference
      .doc(documentId)
      .snapshotChanges()
      .pipe(
        map((changes) => {
          const data = changes.payload.data();
          if (data) {
            const id = changes.payload.id;
            return { id, ...(data as IQuestion) };
          } else {
            throw new Error(`Document with id '${documentId}' does not exist.`)
          }
        })
      );
  }

  async insert(question: IQuestion): Promise<IQuestion> {
    const q = new Question(question, this.authService.currentUser);
    const firestoreDoc = this.collectionReference.doc(q.value.id);
    await firestoreDoc.set(q.value);
    // Example only. If you want to fetch data from db after insert.
    // Otherwise, return the above promise.
    const snapshot = await firestoreDoc.get().toPromise();
    return snapshot.data() as IQuestion;
  }

  update(question: IQuestion): Promise<void> {
    return this.collectionReference.doc(question.id).update(question);
  }

  delete(documentId: string): Promise<void> {
    return this.collectionReference.doc(documentId).delete();
  }

  upvote(question: IQuestion): Promise<void> {
    //TODO: Logic to upvote once
    const firestoreDoc = this.collectionReference.doc(question.id);
    return firestoreDoc.update({
      votes: firestore.FieldValue.increment(1)
    });
  }

  downvote(question: IQuestion): Promise<void> {
    //TODO: Logic to downvote once
    const firestoreDoc = this.collectionReference.doc(question.id);
    return firestoreDoc.update({
      votes: firestore.FieldValue.increment(-1)
    });
  }

  //Another approach
  // subscribeToCollection() {
  //   //TODO: implement pagination and do not subscribe to snapshotchanges. just take(1)
  //   this.collectionReference.snapshotChanges().subscribe((response) => {
  //     if (response) {
  //       this.questions = response.map((documentChangeAction) => {
  //         return {
  //           id: documentChangeAction.payload.doc.id,
  //           ...documentChangeAction.payload.doc.data(),
  //         };
  //       });
  //       console.log('subscribing to list', this.questions)
  //     }
  //   });
  // }
}
