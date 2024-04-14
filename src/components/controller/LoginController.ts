import { showToast } from "../../helpers/helpers";
import { LoginPass, Route } from "../../types/appRoutes";
import { LoginModel } from "../model/LoginModel";
import { LoginView } from "../view/LoginView";

export class LoginController {
  loginDiv: HTMLElement;
  view: LoginView;
  model: LoginModel;

  constructor(loginDiv: HTMLElement) {
    this.loginDiv = loginDiv;

    this.view = new LoginView(loginDiv);
    this.model = new LoginModel();
    this.view.handleSignIn = this.handleSignIn.bind(this);
  }

  /************* вызов отрисовки логина ************* */

  public show() {
    this.view.render();
  }

  /************* проверка логина и пароля и переход на страницу с вводом ФИО ************* */

  private handleSignIn(login: string, password: string) {
    if (login === LoginPass.login && password === LoginPass.password) {
      this.model.saveLoginData({ name: login, pass: password });
      window.location.hash = Route.fio;
      showToast("Success :)");
    } else {
      showToast("Wrong login/password :(");
    }
  }
}
