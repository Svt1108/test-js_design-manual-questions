import { showToast } from "../../helpers/helpers";
import { Route } from "../../types/appRoutes";
import { FioModel } from "../model/FioModel";
import { FioView } from "../view/FioView";

export class FioController {
  fioDiv: HTMLElement;
  view: FioView;
  model: FioModel;

  constructor(fioDiv: HTMLElement) {
    this.fioDiv = fioDiv;

    this.view = new FioView(fioDiv);
    this.model = new FioModel();
    this.view.handleFioIn = this.handleFioIn.bind(this);
    this.view.handleLastResultIn = this.handleLastResultIn.bind(this);
  }

  /************* вызов отрисовки страницы с ФИО ************* */

  public show() {
    this.view.render();
  }

  /************* вызов сохранения ФИО и переход на страницу с вопросами ************* */

  private handleFioIn(
    fio: string,
    category: string,
    info: string,
    dateFormat: string,
    dateForFileName: string
  ) {
    this.model.saveFioData({
      fio,
      category,
      info,
      dateFormat,
      dateForFileName,
    });
    window.location.hash = Route.theme;
  }

  /************* вызов страницы с результатами прошлого тестирования ************* */

  private handleLastResultIn() {
    if (localStorage.getItem("questionsQuestions")) {
      window.location.hash = Route.result;
    } else showToast("Нет сведений о прошлом тестировании :(");
  }
}
