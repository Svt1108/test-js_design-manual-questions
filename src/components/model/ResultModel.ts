import { answers } from "../../data/data-a";
import { AnswerForView, Balls, Constants, Sign } from "../../types/types";

export class ResultModel {
  /************* сохранение результатов тестирования (баллы, количество правильных ответов, максимальный балл) ************* */

  private saveResultData(data: {
    result: number;
    rightAnswersQuantity: number;
    maxResult: number;
    maxResultNonAuto: number;
  }) {
    const resultData = data;
    localStorage.setItem("resultResult", JSON.stringify(resultData));
  }

  /************* обработка результатов тестирования ************* */

  public getResult() {
    const answersUser = JSON.parse(
      localStorage.getItem("questionsQuestions") as string
    );

    /************* количество баллов ************* */
    let result = 0;
    /************* количество правильных ответов ************* */
    let rightAnswersQuantity = 0;
    /************* максимально возможный балл ************* */
    let maxResult = 0;
    /************* максимально возможный балл для вопросов без вариантов ответа ************* */
    let maxResultNonAuto = 0;
    /*************** ответы на вопросы с вариантами ответа (для автоматической проверки) **************** */
    const answersForView = [] as AnswerForView[];
    /*************** ответы на вопросы без вариантов ответа (для ручной проверки) **************** */
    const answersForCheck = [] as AnswerForView[];

    for (let j = 0; j < answersUser.length; j++) {
      /********** для вопросов с вариантами ответа ********* */
      if (answersUser[j].is_answers !== Constants.without_answers) {
        for (let i = 0; i < answers.length; i++) {
          let sign = Sign.withoutAnswer;
          if (answers[i].id === answersUser[j].id) {
            maxResult = maxResult + Number(answers[i].ball);
            if (answersUser[j].answer !== "null") {
              sign = Sign.empty;
              if (answers[i].r_number === answersUser[j].answer) {
                result = result + Number(answers[i].ball);
                rightAnswersQuantity++;
                sign = Sign.right;
              } else {
                sign = Sign.noRight;
              }
            }
            answersForView.push({
              id: answers[i].id,
              usersAnswer:
                answersUser[j].answer !== "null" ? answersUser[j].answer : "",
              sign: sign,
            });
          }
        }
      } else {
        /********** для вопросов без вариантов ответа ********* */
        const firstLetter = answersUser[j].id.slice(0, 1);
        maxResultNonAuto =
          maxResultNonAuto + (firstLetter === "Т" ? Balls.T : Balls.P);
        answersForCheck.push({
          id: answersUser[j].id,
          usersAnswer:
            answersUser[j].answer !== "null" ? answersUser[j].answer : "",
          sign: "",
        });
      }
    }

    this.saveResultData({
      result: result,
      rightAnswersQuantity: rightAnswersQuantity,
      maxResult: maxResult,
      maxResultNonAuto: maxResultNonAuto,
    });

    return {
      result: result,
      rightAnswersQuantity: rightAnswersQuantity,
      maxResult: maxResult,
      maxResultNonAuto: maxResultNonAuto,
      answersForView: answersForView,
      answersForCheck: answersForCheck,
    };
  }

  /************* удаление результатов тестирования ************* */

  public deleteResultData() {
    localStorage.removeItem("resultResult");
  }
}
