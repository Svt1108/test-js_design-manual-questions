import { showToast } from "../../helpers/helpers";
import { Route } from "../../types/appRoutes";
import { ThemeName } from "../../types/types";
import { ThemeModel } from "../model/ThemeModel";
import { ThemeView } from "../view/ThemeView";

export class ThemeController {
  themeDiv: HTMLElement;
  view: ThemeView;
  model: ThemeModel;

  constructor(themeDiv: HTMLElement) {
    this.themeDiv = themeDiv;

    this.view = new ThemeView(themeDiv);
    this.model = new ThemeModel();
    this.view.handleThemeIn = this.handleThemeIn.bind(this);
  }

  /************* вызов отрисовки страницы с темами ************* */

  public show() {
    this.view.render(this.model.getThemes());
  }

  /************* переход на страницу с вопросами ************* */

  private handleThemeIn(myTicketArr: ThemeName[]) {
    this.model.saveThemeData(myTicketArr);
    window.location.hash = Route.questions;
  }
}
