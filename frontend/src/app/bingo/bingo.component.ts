import { Component, OnInit } from '@angular/core';
import { BingoService } from '../bingo.service';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
})
export class BingoComponent implements OnInit {
  public bingoFields: any;
  public questionText: string;
  public selectedIndex: number | undefined;
  public questionAnswer: string | undefined;
  public style1: string;
  public style2: string;
  public style3: string;
  public userAnswers: any;

  constructor(private _service: BingoService) {
    this.bingoFields = [];
    this.questionText = 'Wähle ein Feld aus.';
    this.selectedIndex = undefined;
    this.questionAnswer = undefined;
    this.userAnswers = {};
    this.style1 =
      'p-5 text-center border cursor-pointer transition duration-500 hover:bg-purple-500';
    this.style2 =
      'p-5 bg-green-500 text-center border cursor-pointer transition duration-500 hover:bg-purple-500';
    this.style3 = 'bg-orange-500';
  }

  selectQuestion(field: any) {
    this.questionText = field.question;
    this.selectedIndex = field.number - 1;
  }

  updateAnswer() {
    if (
      this.selectedIndex != undefined &&
      this.questionAnswer != undefined &&
      this.questionAnswer !== ''
    ) {
      this._service.updateAnswer(this.selectedIndex, this.questionAnswer);
    }
  }

  getStyle(index: number) {
    let style =
      'p-5 text-center border cursor-pointer transition duration-500 hover:bg-purple-500';
    if (this.userAnswers[index] != 'no answer') {
      style =
        'p-5 bg-green-500 text-center border cursor-pointer transition duration-500 md:hover:bg-purple-500';
    }
    if (this.selectedIndex == index) {
      style =
        'p-5 bg-orange-500 text-center border cursor-pointer transition duration-500 md:hover:bg-purple-500';
    }
    return style;
  }

  async ngOnInit() {
    this.bingoFields = await this._service.getBingo();
    this.userAnswers = await this._service.getUserAnswers();
  }
}
