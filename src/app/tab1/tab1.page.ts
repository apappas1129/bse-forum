import { map } from "rxjs/operators";
import { QuestionService } from "./../providers/question.service";
import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { IonInfiniteScroll } from "@ionic/angular";
import { IQuestion } from "../models/question.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public test = "hot";
  dummyDate = new Date().getTime();
  $questions: Observable<IQuestion[]>;

  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {
    this.$questions = this.questionService.getList().pipe(
      map((data) => {
        return data.map((q) => {
          q.body = this.strip(q.body);
          return q;
        });
      })
    );
  }

  private strip(htmlStr) {
    const div = document.createElement("div");
    div.innerHTML = htmlStr;
    const text = div.textContent || div.innerText || "";
    return text;
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (response.data.totalCount == this.questions.length) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  viewQuestion(event: Object, question) {
    this.router.navigate(["question", question.id]);
  }
}
