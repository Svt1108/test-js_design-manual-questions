import { questions } from "../../data/data-q";
import { createElementMy } from "../../helpers/helpers";
import { AnswerForView, Balls, Data, Grade } from "../../types/types";
const M = require("../../materialize/js/materialize");

export class ExaminerWindow {
  formForCheck?: HTMLFormElement;

  public createExaminerWindow(
    modalExaminer: HTMLElement,
    answersForCheck: AnswerForView[]
  ): void {
    /******** очистка окна и удаление тултипов ******** */
    modalExaminer.innerHTML = "";
    const materialTooltipTags = document.querySelectorAll(".material-tooltip");
    const materialTooltipArr = [...materialTooltipTags];
    materialTooltipArr.map((el) => el.remove());

    /******** сохранение данных формы при закрытии модального окна ******** */
    const modalForManage = M.Modal.getInstance(modalExaminer);
    modalForManage.options.onCloseStart = () => {
      this.handleGrades(answersForCheck);
    };

    const modalContent = createElementMy("div", "modal-content");
    const title = createElementMy(
      "h5",
      "center-align",
      "Questions for examiner's check"
    );
    const subtitle = createElementMy(
      "h6",
      "center-align",
      "(to see the hint hover over the question index)"
    );
    modalExaminer.appendChild(title);
    modalExaminer.appendChild(subtitle);
    modalExaminer.appendChild(modalContent);

    this.formForCheck = createElementMy(
      "form",
      "form-for-check",
      "",
      "formForCheck"
    ) as HTMLFormElement;

    modalContent.appendChild(this.formForCheck);

    /******* отрисовка списка вопросов с всплывающими подсказками и выпадающим списком для оценки ***** */
    answersForCheck.map((el: AnswerForView) => {
      const index = questions.findIndex((el1: Data) => el1.id === el.id);
      const quest1 = createElementMy("span", "tooltipped teal-text");
      const quest2 = createElementMy("span", "question-name");
      const firstLetter = el.id.slice(0, 1);
      quest1.innerHTML = `${el.id}. `;
      /******* отрисовка вопроса ***** */
      quest2.innerHTML = `${questions[index].question}`;
      /******* отрисовка всплывающей подсказки ***** */
      quest1.setAttribute("data-position", "top");
      quest1.setAttribute(
        "data-tooltip",
        `${questions[index].options[0].option}`
      );
      M.Tooltip.init(quest1);

      /******* отрисовка ответа ***** */
      const answ = createElementMy(
        "p",
        "",
        `\nAnswer:\n${el.usersAnswer} ${el.sign}`
      );

      /******* отрисовка выпадающего списка для оценки экзаменатора ***** */
      const gradeWrap = createElementMy("div", "input-field grade-wrap");
      const gradeLabel = createElementMy("p", "", "Score:");
      const grade = createElementMy(
        "select",
        "browser-default",
        "",
        `${el.id}`
      ) as HTMLSelectElement;
      grade.setAttribute("name", `${el.id}`);
      const maxGrade = firstLetter === "Т" ? Balls.T : Balls.P;
      for (let i = 0; i <= maxGrade; i++) {
        const gradeValue = createElementMy("option", "", `${i}`);
        gradeValue.setAttribute("value", `${i}`);
        grade.appendChild(gradeValue);
      }
      /******* если оценка уже была поставлена, показать её ***** */
      if (localStorage.getItem("gradesArr")) {
        const arr = JSON.parse(
          localStorage.getItem("gradesArr") as string
        ) as Grade[];
        const defaultGradeValue = arr.find(
          (el1) => el1.id === el.id
        )?.examinerGrade;
        if (defaultGradeValue && Number(defaultGradeValue) > 0) {
          grade.value = defaultGradeValue;
        }
      }
      const questWrap = createElementMy("div", "quest-wrap");
      questWrap.appendChild(quest1);
      questWrap.appendChild(quest2);
      gradeWrap.appendChild(gradeLabel);
      gradeWrap.appendChild(grade);
      this.formForCheck?.appendChild(questWrap);
      this.formForCheck?.appendChild(answ);
      this.formForCheck?.appendChild(gradeWrap);
    });
    const btnEnd = createElementMy(
      "button",
      "btn btn-questions center-align modal-close teal darken-1",
      "Finish"
    ) as HTMLButtonElement;
    this.formForCheck.appendChild(btnEnd);
    btnEnd.onclick = (event) => {
      event.preventDefault();
    };
  }

  /****** подсчёт и сохранение оценки экзаменатора ***** */
  private handleGrades(answersForCheck: AnswerForView[]) {
    const formData = new FormData(this.formForCheck);
    const gradesArr: Grade[] = [];
    let resultGrade = 0;
    answersForCheck.map((el: AnswerForView) => {
      const examinerGrade = formData.get(`${el.id}`);
      gradesArr.push({
        id: el.id,
        examinerGrade: `${examinerGrade}`,
      });
      resultGrade = resultGrade + Number(examinerGrade);
    });
    localStorage.setItem("gradesArr", JSON.stringify(gradesArr));
    localStorage.setItem("resultGrade", resultGrade.toString());
    const examGrade = document.getElementById(
      "exam-grade"
    ) as HTMLParagraphElement;
    examGrade.innerHTML = `Examiner's score: ${
      localStorage.getItem("resultGrade")
        ? localStorage.getItem("resultGrade")
        : "___"
    } points out of ${
      JSON.parse(localStorage.getItem("resultResult") as string)
        .maxResultNonAuto
    } possible`;

    const fullResult =
      Number(
        JSON.parse(localStorage.getItem("resultResult") as string).result
      ) +
      Number(
        localStorage.getItem("resultGrade")
          ? localStorage.getItem("resultGrade")
          : "0"
      );

    const fullMaxResult =
      Number(
        JSON.parse(localStorage.getItem("resultResult") as string)
          .maxResultNonAuto
      ) +
      Number(
        JSON.parse(localStorage.getItem("resultResult") as string).maxResult
      );

    const fullGrade = document.getElementById(
      "full-grade"
    ) as HTMLParagraphElement;
    fullGrade.innerHTML = `Full score: <span class="underline">${fullResult} points out of ${fullMaxResult} possible (${Math.round(
      (fullResult / fullMaxResult) * 100
    )}%)</span>`;
  }
}
