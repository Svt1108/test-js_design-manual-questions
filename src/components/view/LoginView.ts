import { PROGRAM_NAME } from "../../data/const";

export class LoginView {
  mainDiv;
  formLogin?: HTMLFormElement;
  handleSignIn?: (login: string, password: string) => void;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  /************* отрисовка формы с логином ************* */

  public render() {
    this.mainDiv.innerHTML = `<div class="login-wrapper">
    <h3 class="header light h3-lang center-align">${PROGRAM_NAME}</h3>  
    <div class="section no-pad-bot">
      <div class="container form-background z-depth-5 center-align ">

        <div class="row center">
          <h6 class="header light h5-lang center-align">Login to the program:</h6>
        </div>

        <form id="formLogin">
        <div class="row">
          <div class="input-field col s12" id="login-field">
            <input id="login" type="text" class="validate" name="login" required>
            <label for="login" class="blue-text text-darken-1" id="label-login">User name</label>
          </div>
        <div class="row">
          <div class="input-field col s12" id="password-field">
            <input id="password" type="password" class="validate" name="password" required>
            <label for="password" class="blue-text text-darken-1">Password</label>
          </div>
        </div>
        <button class="btn" type="submit" name="action">Enter
        <i class="material-icons right">send</i>
      </button>
      </form>
      </div>
    </div>
  </div>`;

    const value = localStorage.getItem("userTesting");
    const labelLogin = document.getElementById(
      "label-login"
    ) as HTMLLabelElement;
    const login = document.getElementById("login") as HTMLInputElement;
    if (value) {
      login.value = JSON.parse(value);
      labelLogin.classList.add("active");
    }

    this.formLogin = document.getElementById("formLogin") as HTMLFormElement;
    this.formLogin.onsubmit = (e) => this.handleLogin(e);
  }

  /************* обработка сабмита формы ************* */

  private handleLogin(e: Event) {
    e.preventDefault();
    const formData = new FormData(this.formLogin);

    const login = formData.get("login")?.toString().trim();
    const password = formData.get("password");

    /************* прокидывание метода в контроллер ************* */
    this.handleSignIn?.(`${login}`, `${password}`);
  }
}
