const M = require("../materialize/js/materialize");

/************* создание нового HTML-элемента ************* */

export const createElementMy = (
  tag: string,
  className?: string,
  text?: string,
  id?: string,
  disabled?: boolean
) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.innerText = text;
  if (id) el.id = id;
  if (disabled) el.setAttribute("disabled", "");
  return el;
};

/************* всплывающие сообщения ************* */

export const showToast = (text: string) => {
  M.toast({ html: text });
};

/************* рандомное перемешивание массива ************* */

export const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(
      Math.random() * (i + 1)
    ); /***случайный индекс от 0 до i *****/

    /***** поменять элементы местами
        то же самое можно записать как:
       let t = array[i]; array[i] = array[j]; array[j] = t   *****/
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/************* создание HTML-файла с результатами тестирования ************* */

export const saveResult = (invisibleWrapper: HTMLElement, type = "") => {
  const styles = `<style>
      .result-background {
          font-family: 'Roboto', sans-serif;
          margin: 2rem 0;
          padding: 2rem;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 30px;
        }    
        .result-fio {
          text-align: center;
          padding-bottom: 3rem;
        }    
        .underline {
          font-weight: 500;
        }
        .text-title {
          padding-bottom: 1rem;
        }
        .result-input {
          outline: 0;
          font-size: 1.8rem;
          padding: 0.2rem 0.5rem;
          width: 7rem;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          margin: 0 1rem;
        }
        .result-title {
          text-align: center;
          padding-bottom: 1rem;
          font-size: 1.2rem;
        }
        .question-name {
          white-space: pre-wrap;
        }
      </style>`;

  const fioSaved = JSON.parse(localStorage.getItem("fioTesting") as string);
  const fio = fioSaved.fio;
  const dateForFileName = fioSaved.dateForFileName;

  /************* получение содержимого страницы для сохранения ************* */
  const pageContent = document.getElementById("save-content-wrapper")
    ?.innerHTML as string;

  const bl = new Blob([styles, pageContent], {
    type: "text/html",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(bl);
  a.download = `${fio}_${dateForFileName}_${type}.html`;
  a.hidden = true;
  document.body.appendChild(a);
  a.innerHTML = "";
  a.click();

  /************* удаление списка вопросов с признаком правильности ответа ************* */
  invisibleWrapper.innerHTML = "";

  /************* ссылка удаляется, чтобы на странице не было лишних элементов ************* */
  document.body.removeChild(a);
};
