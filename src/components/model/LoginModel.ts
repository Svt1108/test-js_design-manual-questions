import { FlagFinish, LoginData } from "../../types/types";

export class LoginModel {
  /************* сохранение логина и флага начала тестирования ************* */

  public saveLoginData(data: LoginData) {
    const loginTime = Date.now();
    const userData = { ...data, loginTime };
    localStorage.setItem("userTesting", JSON.stringify(userData.name));
    sessionStorage.setItem("userTesting", JSON.stringify(userData.name));
    sessionStorage.setItem("flag_finish", FlagFinish.start);
  }

  /************* обновление логина (пока не используется) ************* */

  public updateLoginData(userData: LoginData) {
    const updatedTime = Date.now();
    if (!sessionStorage.getItem("userTesting")) {
      const newData = { ...userData, loginTime: updatedTime };
      sessionStorage.setItem("userTesting", JSON.stringify(newData));
    }
  }

  /************* удаление логина ************* */

  public deleteLoginData() {
    sessionStorage.removeItem("userTesting");
  }
}
