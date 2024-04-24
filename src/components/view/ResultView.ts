import { IMG_PATH, PROGRAM_NAME } from "../../data/const";
import { questions, categories } from "../../data/data-q";
import { saveResult, createElementMy } from "../../helpers/helpers";
import {
  AnswerForView,
  Balls,
  Data,
  FlagFinish,
  Grade,
} from "../../types/types";
import { ExaminerWindow } from "./ExaminerView";
import { ModalWindow } from "./ModalView";

export class ResultView {
  mainDiv;
  handleExitIn?: () => void;
  handleNewIn?: () => void;
  formResult?: HTMLFormElement;
  modalWindow: ModalWindow;
  examinerWindow: ExaminerWindow;

  constructor(mainDiv: HTMLElement) {
    this.mainDiv = mainDiv;
    this.modalWindow = new ModalWindow();
    this.examinerWindow = new ExaminerWindow();
  }

  /************* отрисовка результатов теста ************* */

  public render(res: {
    result: number;
    rightAnswersQuantity: number;
    maxResult: number;
    maxResultNonAuto: number;
    answersForView: AnswerForView[];
    answersForCheck: AnswerForView[];
  }) {
    const fioSaved = JSON.parse(localStorage.getItem("fioTesting") as string);
    const fio = fioSaved.fio;
    const categoryId = fioSaved.category;
    const info = fioSaved.info;

    const categoryName = categories
      .map((el) => el.cats.find((el1) => el1.id === categoryId)?.name)
      .join("");

    const dateFormat = fioSaved.dateFormat;

    // console.log(IMG_PATH);

    /******************** Автоматическое сохранение результатов тестирования
      this.save(stylesNoVisible, fio, dateForFileName);         
      this.save(stylesVisible, fio, dateForFileName);      
      ************************/

    this.mainDiv.innerHTML = `<div class="result-wrapper">
        <div class="save-content-wrapper" id="save-content-wrapper">
        <div class="result-background z-depth-3 ">    
         <p class="result-title underline">Your test result in program ${PROGRAM_NAME}</p>
         <p class="result-fio">Full name: <span class="underline">${fio}</span> <br> Category: <span class="underline">${categoryName}</span> <br> Additional information: <span class="underline">${info}</span> <br> Date: <span class="underline">${dateFormat}</span></p>
         <p class="result-res">Part with automatic evaluation: <span class="underline">${res.result} points out of ${res.maxResult} possible (${res.rightAnswersQuantity} right answers)</span></p>
         <p class="result-res" id="exam-grade"></p>
        <div id="invisible-wrapper"></div>
        </div>
        </div>
        <button class="btn" id="btn_save">Save</button><br>
        <button class="btn" id="btn_save_add">Save extra</button><br>
        <a class="btn deep-purple darken-1 modal-trigger" href="#modal_examiner" id="btn_examiner">For examiner</a>
        <div id="modal_examiner" class="modal"></div>
        <div class="exit">
        <button class="btn orange darken-3" id="btn_new">New test</button>
        <p class="orange-text text-darken-1" id="authorization-text">(you have to login again)</p>
        </div>
      </div>`;

    const examGrade = document.getElementById(
      "exam-grade"
    ) as HTMLParagraphElement;
    examGrade.innerHTML = `Examiner's score: <span class="underline">${
      localStorage.getItem("resultGrade")
        ? localStorage.getItem("resultGrade")
        : "____"
    } points out of ${res.maxResultNonAuto} possible</span>`;

    const modalExaminer = document.getElementById(
      "modal_examiner"
    ) as HTMLElement;

    /************* сообщение о необходимости авторизации показывается в случае завершения теста
     * и не показывается при просмотре результатов прошлого тестирования ************* */

    const authorizationText = document.getElementById(
      "authorization-text"
    ) as HTMLElement;

    if (sessionStorage.getItem("flag_finish") !== FlagFinish.finish) {
      authorizationText.classList.add("invisible");
    }

    const invisibleWrapper = document.getElementById(
      "invisible-wrapper"
    ) as HTMLElement;

    /******** вариант скачивания без blob*** 
    const a = document.createElement("a");
    a.download = "page.html";
    a.href = 'data:text/html;charset=UTF-8,'+encodeURIComponent(document.documentElement.outerHTML);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    const saveWrapper = document.getElementById(
      "save-content-wrapper"
    ) as HTMLElement;
    saveWrapper.appendChild(forCheck);
    */

    /************* получение кнопок  ************* */

    const buttonSave = document.getElementById("btn_save") as HTMLButtonElement;
    const buttonSaveAdd = document.getElementById(
      "btn_save_add"
    ) as HTMLButtonElement;
    const buttonNew = document.getElementById("btn_new") as HTMLButtonElement;
    const buttonExaminer = document.getElementById(
      "btn_examiner"
    ) as HTMLButtonElement;

    /************* кнопка Сохранить ************* */
    buttonSave.onclick = () => {
      const signature = createElementMy(
        "p",
        "text-title",
        "\nCandidate's signature: ____________\n\nExaminer's signature: ____________"
      );
      invisibleWrapper.appendChild(signature);
      saveResult(invisibleWrapper, "user");
      invisibleWrapper.innerHTML = "";
    };

    /************* кнопка Сохранить дополнительно ************* */
    /************* отрисовка списка вопросов с автоматической проверкой  ************* */
    buttonSaveAdd.onclick = () => {
      const invisible = createElementMy("div", "", "", "invisible");
      const protocol = createElementMy(
        "p",
        "text-title",
        "Protocol of the part with automatic verification:"
      );
      invisible.appendChild(protocol);
      this.handleArray(res.answersForView, invisible, true);

      /************* отрисовка блока вопросов для проверки экзаменатором  ************* */

      const forCheck = createElementMy("div", "", "", "forCheck");

      const manualCheck = createElementMy(
        "p",
        "text-title",
        "Questions for examiner's check:"
      );
      forCheck.appendChild(manualCheck);
      this.handleArray(res.answersForCheck, forCheck, false);

      /************* отрисовка списка правильных ответов для вопросов с неавтоматической проверкой ************* */

      const rightAnswersList = createElementMy(
        "div",
        "",
        "",
        "rightAnswersList"
      );

      const rightAnswersTitle = createElementMy(
        "p",
        "text-title",
        "Answers to questions assessed by examiner:"
      );
      rightAnswersList.appendChild(rightAnswersTitle);
      this.handleRightAnswersArray(res.answersForCheck, rightAnswersList);

      /********** вызов модального окна с подтверждением ********* */

      this.modalWindow.createModal(
        invisibleWrapper,
        invisible,
        forCheck,
        rightAnswersList
      );
    };

    /************* кнопка Для экзаменатора ************* */
    buttonExaminer.onclick = () => {
      this.examinerWindow.createExaminerWindow(
        modalExaminer,
        res.answersForCheck
      );
    };

    /******************** Автоматическое сохранение результатов тестирования 
    invisibleWrapper.appendChild(examinerGrade);
    saveResult(invisibleWrapper, "user");
    invisibleWrapper.innerHTML = "";      *****/

    /************* кнопка Новое тестирование ************* */
    buttonNew.onclick = () => {
      this.handleNew();
    };
  }

  /************* прокидка запуска нового тестирования в контроллер ************* */
  private handleNew() {
    this.handleNewIn?.();
  }

  /************** обработка массива с ответами для подстановки текста вопроса ***************** */

  private handleArray(
    arr: AnswerForView[],
    htmlBlock: HTMLElement,
    ifAuto: boolean
  ) {
    arr.map((el: AnswerForView) => {
      const index = questions.findIndex((el1: Data) => el1.id === el.id);
      const quest = createElementMy("p", "question-name");
      quest.innerHTML = `<br>${el.id}. ${questions[index].question}`;

      /********* получение текста выбранного ответа (для вопросов с вариантами ответа) ****** */
      const answFull = questions[index].options.find(
        (el2) => el2.number === el.usersAnswer
      );
      const answText = el.usersAnswer === "" ? "" : answFull?.option;
      const answIsImage = el.usersAnswer === "" ? false : answFull?.is_image;
      const answ = createElementMy(
        "p",
        "",
        `Answer:\n${el.usersAnswer}${answText ? ") " + answText : ""} ${
          el.sign
        }`
      );
      /******* если вариант ответа представлен скриншотом ***** */
      if (answIsImage) {
        answ.innerHTML = `Answer:\n${el.usersAnswer}${
          answText ? ") " + answText : ""
        } ${el.sign}`;
      }
      htmlBlock.appendChild(quest);
      htmlBlock.appendChild(answ);
      /******* отрисовка оценки экзаменатора для вопросов с неавтоматической проверкой ***** */
      if (!ifAuto) {
        const gradesArr: Grade[] = localStorage.getItem("gradesArr")
          ? JSON.parse(localStorage.getItem("gradesArr") as string)
          : [];
        const examinerGrade = gradesArr.find(
          (el3) => el3.id === el.id
        )?.examinerGrade;
        const grade = createElementMy(
          "p",
          "",
          `Score: ${examinerGrade ? examinerGrade : "___"}`
        );
        htmlBlock.appendChild(grade);
      }
    });
  }

  private handleRightAnswersArray(
    arr: AnswerForView[],
    htmlBlock: HTMLElement
  ) {
    arr.map((el: AnswerForView) => {
      const index = questions.findIndex((el1: Data) => el1.id === el.id);
      const quest = createElementMy("p", "question-name");
      htmlBlock.appendChild(quest);
      quest.innerHTML = `<br>${el.id}. ${questions[index].question}`;
      const rightAnswer = createElementMy("p");
      rightAnswer.innerHTML = `Right answer:\n${questions[index].options[0].option}`;
      htmlBlock.appendChild(rightAnswer);
    });
  }
}
