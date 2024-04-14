import { showToast } from "../../helpers/helpers";
import { Route } from "../../types/appRoutes";
import { FlagFinish, QuestionsData } from "../../types/types";
import { QuestionsModel } from "../model/QuestionsModel";
import { QuestionsView } from "../view/QuestionsView";

export class QuestionsController {
  questionsDiv: HTMLElement;
  view: QuestionsView;
  model: QuestionsModel;

  constructor(questionsDiv: HTMLElement) {
    this.questionsDiv = questionsDiv;

    this.view = new QuestionsView(questionsDiv);
    this.model = new QuestionsModel();
    this.view.handleQuestionsIn = this.handleQuestionsIn.bind(this);
  }

  /************* вызов отрисовки страницы с вопросами ************* */

  public show() {
    this.model.deleteQuestionsData();
    this.view.render(this.model.getQuestions() || []);
  }

  /************* сохранение ответов во время прохождения теста и после его завершения ************* */

  private handleQuestionsIn(answers: QuestionsData[], flag: string) {
    this.model.saveQuestionsData(answers);
    if (flag === FlagFinish.finish) {
      window.location.hash = Route.result;
      sessionStorage.setItem("flag_finish", flag);
      showToast("Test is finished!");
    }
  }
}
