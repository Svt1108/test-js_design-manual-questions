import { categories } from "../../data/data-q";
import { createElementMy } from "../../helpers/helpers";

export class FioView {
  mainDiv;
  formFio?: HTMLFormElement;
  handleFioIn?: (
    fio: string,
    category: string,
    info: string,
    dateFormat: string,
    dateForFileName: string
  ) => void;
  handleLastResultIn?: () => void;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  /************* отрисовка формы с ФИО ************* */

  public render() {
    this.mainDiv.innerHTML = `<div class="fio-wrapper">
      <button class="btn pink darken-4 btn-result" id="btn_result">Previous result</button>
      <p class="pink-text text-lighten-4 text-result">(available for a test previously launched on this computer in this browser, until a new test is launched, that is, before the START button is clicked)</p>
      <h5 class="header light h4-lang center-align">Information to start</h5>
      <div class="section no-pad-bot">
        <div class="container form-background z-depth-5 center-align ">
  
          <div class="row center">
            <h6 class="header light h5-lang center-align">Text data for testing:</h6>
          </div>
  
          <form id="formFio">
          <div class="row">
            <div class="input-field col s12" id="fio-field">
              <input id="fio" type="text" class="validate teal-text text-lighten-3" name="fio" required>
              <label for="fio" class="grey-text text">Full name</label>
            </div>
          </div>
          <div class="row">
          <div class="input-field col s12" id="category-field">
          <select id="category" name="category" class="teal-text text-lighten-3"></select>
          <label for="category" class="grey-text text">Category</label>
        </div>
          </div>  
          <div class="row">
            <div class="input-field col s12" id="info-field">
              <input id="info" type="text" class="validate teal-text text-lighten-3" name="info" maxlength="50">
              <label for="info" class="grey-text text">Additional information (50 letters max)</label>
            </div>
          </div>
          <button class="btn teal darken-1" type="submit" name="action">Next
          <i class="material-icons right">send</i>
        </button>
        </form>
        </div>
      </div>
    </div>`;

    const category = document.getElementById("category") as HTMLSelectElement;
    categories.map((el) => {
      const optgroup = createElementMy(
        "optgroup",
        "blue-text text-darken-3"
      ) as HTMLOptGroupElement;
      category.appendChild(optgroup);
      optgroup.label = el.group;
      el.cats.map((el1) => {
        const option = createElementMy(
          "option",
          "",
          el1.name
        ) as HTMLOptionElement;
        optgroup.appendChild(option);
        option.value = el1.id;
      });
    });

    const buttonResult = document.getElementById(
      "btn_result"
    ) as HTMLButtonElement;
    buttonResult.onclick = () => {
      this.handleLastResult();
    };

    this.formFio = document.getElementById("formFio") as HTMLFormElement;
    this.formFio.onsubmit = (e) => this.handleFio(e);
  }

  /************* обработка сабмита формы ФИО ************* */

  private handleFio(e: Event) {
    e.preventDefault();

    /************* получение текущей даты ************* */

    const date = new Date();
    const dateFormat =
      `0${date.getDate()}`.slice(-2) +
      `.` +
      `0${date.getMonth() + 1}`.slice(-2) +
      `.${date.getFullYear()}`;
    const dateForFileName = dateFormat.split(".").join("");

    const formData = new FormData(this.formFio);

    const fio = formData.get("fio")?.toString().trim();
    const category = formData.get("category");
    const info = formData.get("info")?.toString().trim();

    /************* прокидывание метода в контроллер ************* */
    this.handleFioIn?.(
      `${fio}`,
      `${category}`,
      `${info}`,
      `${dateFormat}`,
      `${dateForFileName}`
    );
  }

  /************* показ результатов прошлого тестирования  ************* */

  private handleLastResult() {
    /************* прокидывание метода в контроллер ************* */
    this.handleLastResultIn?.();
  }
}
