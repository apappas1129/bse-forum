import { AuthenticationService } from "./../providers/auth.service";
//import { IQuestion } from './../models/Question';
import { EditorModalComponent } from "./../shared/editor-modal/editor-modal.component";
import { QuestionService } from "./../providers/question.service";
import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { of, Subscription } from "rxjs";
import { catchError, concatMap, first, tap } from "rxjs/operators";
import { IQuestion } from "../models/question.model";
// import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: "app-question",
  templateUrl: "./question.page.html",
  styleUrls: ["./question.page.scss"],
})
export class QuestionPage implements OnInit {
  @HostListener("click", ["$event"]) onClick(e) {
    console.log("User Click using Host Listener", { target: e.target });
  }
  question: IQuestion;
  private subscription: Subscription;

  currentUserAvatar =
    "https://ionicframework.com/docs/demos/api/list/avatar-yoda.png";

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
    public questionService: QuestionService,
    public modalController: ModalController // private sanitizer: DomSanitizer
  ) {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      if (!id) {
        this.router.navigate(["tabs","tab1"]);
      } else {
        this.subscription = this.questionService
          .get(id)
          .pipe(
            catchError((err, caught) => {
              this.router.navigate(["tabs","tab1"]);
              return caught;
            }),
            concatMap((value, index) =>
              index === 0
                ? of(value).pipe(
                    tap(() => {
                      if (value) this.isLoading = false;
                    })
                  )
                : of(value)
            )
          )
          .subscribe((response) => {
            this.question = response;
            this.isLoading = false;
            console.info("GET QUESTION RESPONSE:", response);
            // You can check individual fields here and make them glow when updated. Using ng class and settimeout combination
          });
      }

      //TODO: fix authentication workflow
      setTimeout(() => {
        this.currentUserAvatar = this.authService.currentUser?.avatar;
      }, 500);
    });
  }

  ngOnInit() {}

  onInputClick(event) {
    event.target.blur();
    this.presentModal();
  }

  onTagClick(wordId: string) {
    this.router.navigate(["word", wordId]);
  }

  upvote() {
    console.log("upvoting...");
    this.questionService.upvote(this.question);
  }

  downvote() {
    this.questionService.downvote(this.question);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EditorModalComponent,
      // cssClass: 'my-custom-class'
    });

    modal.onDidDismiss<IQuestion>().then(({ data }) => {
      data && this.questionService.insert(data);
    });

    return await modal.present();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
