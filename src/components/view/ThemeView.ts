import { createElementMy, shuffle } from "../../helpers/helpers";
import {
  ThemeFullName,
  ThemeName,
  ThemeQuestionsQuantity,
} from "../../types/types";

export class ThemeView {
  mainDiv;
  formTheme?: HTMLFormElement;
  handleThemeIn?: (myTicketArr: ThemeName[]) => void;
  handleLastResultIn?: () => void;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  /************* отрисовка формы с темой ************* */

  public render(themeQuestionsQuantity: ThemeQuestionsQuantity[]) {
    this.mainDiv.innerHTML = `<div class="theme-wrapper">
    <h5 class="header light h4-lang center-align">Themes for testing</h5>
    <div class="section no-pad-bot">
      <div class="container form-theme-background z-depth-5 center-align ">

        <h6 class="header light h6-lang center-align">You can change default themes and questions manually. To do this choose number of questions for each theme:</h6>
        <form id="formTheme">
        <button class="btn pink darken-3" id="btn_clear" type="button">Clear all
        </button> 
        <button class="btn theme-btn" type="submit">Start
        <i class="material-icons right">send</i>
        </button> 
        <div class="all-themes-wrap" id="all_themes_wrap"></div>
        <button class="btn theme-btn" type="submit">Start
          <i class="material-icons right">send</i>
        </button>
        </form>
        </div>
      </div>
    </div>`;

    this.formTheme = document.getElementById("formTheme") as HTMLFormElement;
    const allThemesWrap = document.getElementById(
      "all_themes_wrap"
    ) as HTMLElement;
    themeQuestionsQuantity.map((el) => {
      /******* отрисовка выпадающего списка для каждой темы ***** */
      const themeWrap = createElementMy("div", "input-field theme-wrap");
      const themeLabel = createElementMy(
        "span",
        "",
        `${el.theme}. ${ThemeFullName[el.theme]}`
      );
      const theme = createElementMy(
        "select",
        "browser-default theme-select",
        "",
        `${el.theme}`
      ) as HTMLSelectElement;
      theme.setAttribute("name", `${el.theme}`);
      const maxGrade = el.questionsQuantity;
      for (let i = 0; i <= maxGrade; i++) {
        const themeValue = createElementMy("option", "", `${i}`);
        themeValue.setAttribute("value", `${i}`);
        theme.appendChild(themeValue);
      }

      themeWrap.appendChild(themeLabel);
      themeWrap.appendChild(theme);
      allThemesWrap.appendChild(themeWrap);

      /******* если количество вопросов уже выбрано, показать его ***** */
      if (el.defaultQuestionsQuantity > 0) {
        theme.value = el.defaultQuestionsQuantity.toString();
      }

      // const themeP = createElementMy("p");
      // const themeLabel = createElementMy("label");
      // const themeInput = createElementMy("input");
      // themeInput.setAttribute("type", "checkbox");
      // const themeText = createElementMy(
      //   "span",
      //   "",
      //   `${el.theme} ${ThemeFullName[el.theme]}`
      // );
      // themeLabel.appendChild(themeInput);
      // themeLabel.appendChild(themeText);
      // themeP.appendChild(themeLabel);
      // formTheme?.appendChild(themeP);
    });

    this.formTheme.onsubmit = (e) =>
      this.handleTheme(e, themeQuestionsQuantity);

    const btn_clear = document.getElementById("btn_clear") as HTMLButtonElement;

    btn_clear.onclick = () => this.clearAll();
  }

  /************* обработка сабмита формы Темы ************* */

  private handleTheme(
    e: Event,
    themeQuestionsQuantity: ThemeQuestionsQuantity[]
  ) {
    e.preventDefault();

    const formData = new FormData(this.formTheme);

    const myTicketArr: ThemeName[] = [];

    themeQuestionsQuantity.map((el) => {
      const quantity = Number(formData.get(`${el.theme}`));
      for (let i = 0; i < quantity; i++) {
        myTicketArr.push(el.theme);
      }
    });

    /***** перемешивание порядка вопросов, отдельно теоретических, отдельно практических **** */
    const myTicketArrT = myTicketArr.filter((el) => el.slice(0, 1) === "Т");
    shuffle(myTicketArrT);
    const myTicketArrP = myTicketArr.filter((el) => el.slice(0, 1) === "П");
    shuffle(myTicketArrP);

    /************* прокидывание метода в контроллер ************* */
    this.handleThemeIn?.([...myTicketArrT, ...myTicketArrP]);
  }

  /************* обработка очистки полей ************* */

  private clearAll() {
    const arr = document.querySelectorAll("select");
    arr.forEach((el) => {
      el.value = "0";
    });
  }
}
