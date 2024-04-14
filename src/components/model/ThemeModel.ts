import { ThemeName, ThemeQuestionsQuantity, Ticket } from "../../types/types";
import { questions, themesArr } from "../../data/data-q";
import { tickets } from "../../data/data-q";

export class ThemeModel {
  /************* получение количества вопросов по каждой теме ************* */

  public getThemes() {
    const themeQuestionsQuantity: ThemeQuestionsQuantity[] = [];

    const cat = JSON.parse(
      localStorage.getItem("fioTesting") as string
    ).category;

    const myTicket =
      (tickets as Ticket[]).find((el) => el.category === cat)?.themes || [];

    themesArr.map((el) => {
      let defaultQuestionsQuantity = 0;
      const quantity = questions.filter((el1) => el === el1.theme).length;

      myTicket.map((el1) => {
        if (el1 === el) defaultQuestionsQuantity++;
      });

      themeQuestionsQuantity.push({
        theme: el,
        questionsQuantity: quantity,
        defaultQuestionsQuantity: defaultQuestionsQuantity,
      });
    });

    return themeQuestionsQuantity;
  }

  /************* сохранение информации о проходящем тест ************* */

  public saveThemeData(themeData: ThemeName[]) {
    localStorage.setItem("myTicketArr", JSON.stringify(themeData));
  }

  /************* удаление информации о проходящем тест ************* */

  public deleteThemeData() {
    localStorage.removeItem("themeTesting");
  }
}
