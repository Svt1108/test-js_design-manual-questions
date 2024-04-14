import { AppView } from "../view/AppView";
import { Route } from "../../types/appRoutes";
import { LoginController } from "./LoginController";
import { createElementMy } from "../../helpers/helpers";
import { FioController } from "./FioController";
import { QuestionsController } from "./QuestionsController";
import { ResultController } from "./ResultController";
import { ThemeController } from "./ThemeController";

export class AppController {
  mainDiv: HTMLElement;
  login: LoginController;
  fio: FioController;
  appView: AppView;
  prevRoute = "";
  questions: QuestionsController;
  result: ResultController;
  theme: ThemeController;

  constructor() {
    this.mainDiv = createElementMy("main");
    this.appView = new AppView(this.mainDiv);
    this.login = new LoginController(this.mainDiv);
    this.fio = new FioController(this.mainDiv);
    this.theme = new ThemeController(this.mainDiv);
    this.questions = new QuestionsController(this.mainDiv);
    this.result = new ResultController(this.mainDiv);
  }

  /************* запуск приложения ************* */

  public async start() {
    const route = window.location.hash.slice(1);
    this.appView.render();
    this.enableRouting();
    this.prevRoute = route;
    await this.renderNewPage(route);
  }

  /************* привязка роутинга к изменению hash-пути ************* */

  private enableRouting() {
    window.addEventListener("hashchange", () => {
      const route = window.location.hash.slice(1);
      this.prevRoute = route;
      this.renderNewPage(route);
    });
  }

  /************* роутинг (в зависимости от того залогинен ли пользователь) ************* */

  private async renderNewPage(route: string) {
    const isUserLogged = sessionStorage.getItem("userTesting") || false;
    if (!isUserLogged) {
      window.location.hash = Route.login;
      this.login.show();
    } else {
      if (
        route === Route.login ||
        route === Route.index ||
        route === Route.default
      ) {
        window.location.hash = Route.fio;
      }
      if (route === Route.fio) {
        this.fio.show();
      }
      if (route === Route.theme) {
        this.theme.show();
      }
      if (route === Route.questions) {
        this.questions.show();
      }
      if (route === Route.result) {
        this.result.show();
      }
    }

    document.documentElement.scrollTop = 0;

    /************* для работы Materialize framework ************* */
    M.AutoInit(document.body);
  }
}
