import { Data, QuestionsData } from "../../types/types";
import { questions } from "../../data/data-q";
import { shuffle } from "../../helpers/helpers";

export class QuestionsModel {
  /************* сохранение выбранного списка вопросов ************* */

  public saveQuestionsData(data: QuestionsData[]) {
    const questionsData = data;
    localStorage.setItem("questionsQuestions", JSON.stringify(questionsData));
  }

  /********** выбор списка вопросов для тестирования в зависимости от категории **********/

  public getQuestions() {
    if (localStorage.getItem("fioTesting")) {
      //   const cat = JSON.parse(
      //     localStorage.getItem("fioTesting") as string
      //   ).category;

      //   const myTicket =
      //     (tickets as Ticket[]).find((el) => el.category === cat)?.themes || [];

      /********** получение списка вопросов со страницы выбора тем **********/

      const myTicket = localStorage.getItem("myTicketArr")
        ? JSON.parse(localStorage.getItem("myTicketArr") as string)
        : [];

      const ticketQuestions: Data[] = [];

      const copyQuestions = questions.slice();

      /************* рандомное перемешивание массива с вопросами ************* */
      shuffle(copyQuestions);

      for (let i = 0; i < myTicket.length; i++) {
        const index = (copyQuestions as Data[]).findIndex(
          (el) => el.theme === myTicket[i]
        );
        if (index !== undefined && index !== -1) {
          ticketQuestions.push(copyQuestions[index]);
          copyQuestions.splice(index, 1);
        }
      }

      return ticketQuestions;
      /***   return questions;    для тестирования   ***/
    }
  }

  /************* удаление старых результатов ************* */

  public deleteQuestionsData() {
    // localStorage.removeItem("questionsQuestions");
    localStorage.removeItem("gradesArr");
    localStorage.removeItem("resultGrade");
  }
}
