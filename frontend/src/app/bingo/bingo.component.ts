import { Component, OnInit } from '@angular/core';
import { BingoService } from '../bingo.service';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
})
export class BingoComponent implements OnInit {
  public bingoField: any;
  public questionText: string;
  public selectedCoords: number[] | undefined;
  public questionAnswer: string | undefined;
  public bingoFieldStyle: string;
  public selectedFieldStyle: string;
  public answerdFieldStyle: string;
  public userAnswers: string[][] | undefined;

  constructor(private _service: BingoService) {
    this.bingoField = [];
    this.bingoFieldStyle =
      'w-1/5 p-5 text-center border cursor-pointer transition duration-500 hover:bg-orange-500';
    this.answerdFieldStyle = this.bingoFieldStyle + ' bg-green-500';
    this.selectedFieldStyle = this.bingoFieldStyle + ' bg-orange-500';
    this.questionText = 'Wähle ein Feld aus.';
    this.selectedCoords = undefined;
    this.questionAnswer = undefined;
    this.userAnswers = undefined;
  }

  selectQuestion(y: number, x: number) {
    this.questionText = this.bingoField[y][x].question;
    this.selectedCoords = [y, x];
  }

  async updateAnswer() {
    if (
      this.selectedCoords != undefined &&
      this.questionAnswer != undefined &&
      this.questionAnswer !== ''
    ) {
      await this._service.updateAnswer(
        this.selectedCoords,
        this.questionAnswer
      );
      this.userAnswers = await this._service.getUserAnswers();
      console.log(this.userAnswers);

      this.questionAnswer = '';
    }
  }

  async ngOnInit() {
    this.bingoField = await this._service.getBingo();
    this.userAnswers = await this._service.getUserAnswers();
  }
}
