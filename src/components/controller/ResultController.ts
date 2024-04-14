import { Route } from "../../types/appRoutes";
import { FlagFinish } from "../../types/types";
import { LoginModel } from "../model/LoginModel";
import { ResultModel } from "../model/ResultModel";
import { ResultView } from "../view/ResultView";

export class ResultController {
  resultDiv: HTMLElement;
  view: ResultView;
  model: ResultModel;
  modelLogin: LoginModel;

  constructor(resultDiv: HTMLElement) {
    this.resultDiv = resultDiv;

    this.view = new ResultView(resultDiv);
    this.model = new ResultModel();
    this.modelLogin = new LoginModel();
    this.view.handleNewIn = this.handleNewIn.bind(this);
  }

  /************* вызов отрисовки страницы с результатами ************* */

  public show() {
    this.view.render(this.model.getResult());
    if (sessionStorage.getItem("flag_finish") === FlagFinish.finish) {
      this.modelLogin.deleteLoginData();
    }
  }

  /************* переход на страницу с ФИО для запуска нового теста ************* */

  private handleNewIn() {
    window.location.hash = Route.fio;
  }
}
