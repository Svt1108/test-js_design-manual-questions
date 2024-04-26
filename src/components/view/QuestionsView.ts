import { COUNT_SECONDS } from "../../data/const";
import { createElementMy } from "../../helpers/helpers";
import { Route } from "../../types/appRoutes";
import {
  Constants,
  Data,
  FlagFinish,
  QuestionsData,
  ThemeFullName,
} from "../../types/types";

export class QuestionsView {
  mainDiv;
  handleQuestionsIn?: (answers: QuestionsData[], flag: string) => void;
  formQuestions?: HTMLFormElement;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
  }

  /************* отрисовка формы с вопросами ************* */

  public render(questions: Array<Data>) {
    this.mainDiv.innerHTML = "";
    const questionsWrapper = createElementMy("div", "questions-wrapper");
    this.mainDiv.appendChild(questionsWrapper);
    const formBackground = createElementMy(
      "div",
      "container form-questions-background z-depth-5 "
    );
    questionsWrapper.appendChild(formBackground);
    const rowCenter = createElementMy("div", "row center");
    formBackground.appendChild(rowCenter);

    /************* таймер ************* */
    const timer = createElementMy(
      "div",
      "timer z-depth-2 indigo-text text-darken-4",
      "Start!",
      "timer"
    );
    questionsWrapper.appendChild(timer);
    const headerQuestions = createElementMy(
      "h6",
      "header light h6-lang center-align",
      "You have 30 minutes to finish the test. You can change your checked answers. \n To finish test and look result click the button FINISH"
    );
    formBackground.appendChild(headerQuestions);
    const formQuestions = createElementMy(
      "form",
      "form-questions",
      "",
      "formQuestions"
    );
    formBackground.appendChild(formQuestions);

    /************* список вопросов ************* */

    for (let i = 0; i < questions.length; i++) {
      const questionName = createElementMy(
        "p",
        "question-name",
        ``,
        `${questions[i].id}`
      );
      formQuestions.appendChild(questionName);
      questionName.innerHTML = `${i + 1}. ${
        questions[i].question
      } <span class="theme">(Theme: ${
        ThemeFullName[questions[i].theme]
      })</span>`;

      /************* если к вопросу нет вариантов ответа ************* */
      if (
        questions[i].is_answers &&
        questions[i].is_answers?.toString() === Constants.without_answers
      ) {
        const answer1wrap = createElementMy("div", "input-field col s6");
        const icon = createElementMy("i", "material-icons prefix", "mode_edit");
        const answer1 = createElementMy(
          "textarea",
          "materialize-textarea teal-text text-lighten-4",
          "",
          `id${i}`
        ) as HTMLTextAreaElement;
        answer1.name = questions[i].id;
        formQuestions.appendChild(answer1wrap);
        answer1wrap.appendChild(icon);
        answer1wrap.appendChild(answer1);
        answer1wrap.insertAdjacentHTML(
          "beforeend",
          `<label for="id${i}">Answer</label>`
        );
      } else {
        /************* если к вопросу есть варианты ответа ************* */

        questions[i].options.map((el) => {
          const answer1 = createElementMy(
            "input",
            "with-gap",
            "",
            `id${i}${el.number}`
          ) as HTMLInputElement;
          answer1.type = "radio";
          answer1.name = questions[i].id;
          answer1.value = el.number;
          const label1 = createElementMy("label") as HTMLLabelElement;
          const span1 = createElementMy(
            "span",
            "option-name teal-text text-lighten-4",
            el.option
          );
          /******* если вариант ответа представлен скриншотом ***** */
          if (el.is_image) {
            span1.innerHTML = el.option;
          }
          label1.setAttribute("for", `id${i}${el.number}`);
          formQuestions.appendChild(label1);
          label1.appendChild(answer1);
          label1.appendChild(span1);
        });
      }
    }

    const btnEnd = createElementMy(
      "button",
      "btn btn-questions center-align modal-trigger teal darken-1",
      "Finish"
    ) as HTMLButtonElement;
    btnEnd.setAttribute("data-target", "modal_wrapper");
    // btnEnd.href = "#modal_wrapper";
    formQuestions.appendChild(btnEnd);

    this.formQuestions = document.getElementById(
      "formQuestions"
    ) as HTMLFormElement;

    /************* отрисовка таймера ************* */

    let count = COUNT_SECONDS;
    const interval = setInterval(() => {
      const hours = Math.floor(count / 3600);
      const minutes = Math.floor((count - hours * 3600) / 60);
      const seconds = count - hours * 3600 - minutes * 60;
      if (
        !document.getElementById("timer") ||
        window.location.hash.slice(1) !== Route.questions
      ) {
        clearInterval(interval);
      } else {
        (document.getElementById("timer") as HTMLElement).innerHTML =
          `0${hours}`.slice(-2) +
          `:` +
          `0${minutes}`.slice(-2) +
          `:` +
          `0${seconds}`.slice(-2);
        count--;
        /************* сохранение отмеченных ответов каждые 30 секунд ************* */
        if (count !== 0 && count % 30 === 0) {
          this.handleQuestions(questions, FlagFinish.temporary);
        }
        /************* завершение теста по таймеру ************* */
        if (count === 0) {
          clearInterval(interval);
          this.handleQuestions(questions, FlagFinish.finish);
        }
      }
    }, 1000);

    /****** модальное окно с подтверждением завершения теста **** */

    const modalWrapper = createElementMy("div", "modal", "", "modal_wrapper");
    const modalContent = createElementMy("div", "modal-content");
    modalWrapper.appendChild(modalContent);
    const modalFooter = createElementMy("div", "modal-footer");
    modalWrapper.appendChild(modalFooter);
    const btnYes = createElementMy(
      "button",
      "modal-close waves-effect waves-green btn-flat",
      "Yes"
    ) as HTMLButtonElement;
    const btnNo = createElementMy(
      "button",
      "modal-close waves-effect waves-green btn-flat",
      "No"
    ) as HTMLButtonElement;
    modalFooter?.appendChild(btnNo);
    modalFooter?.appendChild(btnYes);
    questionsWrapper.appendChild(modalWrapper);

    /************* кнопка завершения теста ************* */

    btnEnd.onclick = () => {
      let nullAnswersNumber = 0;
      this.handleQuestions(questions, FlagFinish.temporary);
      const answersUser = JSON.parse(
        localStorage.getItem("questionsQuestions") as string
      ) as QuestionsData[];
      answersUser.map((el) => {
        if (el.answer === "null" || el.answer === "") nullAnswersNumber++;
      });

      /*********** количество неотвеченных вопросов для вывода в модальном окне ************ */
      modalContent.innerHTML = "";
      const questionIsPlural =
        nullAnswersNumber === 1 ? " question" : " questions";
      /***** for russian digitals ***** */
      // const lastDigit = nullAnswersNumber.toString().slice(-1);
      // const questionIsPlural =
      //   lastDigit === "2" || lastDigit === "3" || lastDigit === "4"
      //     ? " вопроса"
      //     : lastDigit === "1" && nullAnswersNumber !== 11
      //     ? " вопрос"
      //     : " вопросов";
      const areYouSure = createElementMy(
        "h5",
        "center-align",
        `${
          nullAnswersNumber === 0
            ? ""
            : "You didn't answer " + nullAnswersNumber + questionIsPlural
        }\n\nAre you sure you want to finish test?`
      );
      modalContent.appendChild(areYouSure);
    };

    /************* кнопка "Да" завершения теста ************* */

    btnYes.onclick = () => {
      clearInterval(interval);
      this.handleQuestions(questions, FlagFinish.finish);
    };
  }

  /************* обработка сабмита формы ************* */
  private handleQuestions(questions: Array<Data>, flag: string) {
    const formData = new FormData(this.formQuestions);
    const answersArr: QuestionsData[] = [];

    for (let i = 0; i < questions.length; i++) {
      let is_answers = Constants.with_answers;
      const answer = formData.get(`${questions[i].id}`);
      questions[i].is_answers &&
      questions[i].is_answers?.toString() === Constants.without_answers
        ? (is_answers = Constants.without_answers)
        : "";
      answersArr.push({
        id: questions[i].id,
        answer: `${answer}`,
        is_answers: is_answers,
      });
    }

    /************* прокидывание метода в контроллер ************* */
    this.handleQuestionsIn?.(answersArr, flag);
  }
}
