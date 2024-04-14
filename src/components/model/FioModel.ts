import { FioData, FlagFinish } from "../../types/types";

export class FioModel {
  /************* сохранение информации о проходящем тест ************* */

  public saveFioData(data: FioData) {
    const fioData = { ...data };
    localStorage.setItem("fioTesting", JSON.stringify(fioData));
    sessionStorage.setItem("flag_finish", FlagFinish.start);
  }

  /************* удаление информации о проходящем тест ************* */

  public deleteFioData() {
    localStorage.removeItem("fioTesting");
  }
}
