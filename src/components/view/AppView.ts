export class AppView {
  main: HTMLElement;

  constructor(main: HTMLElement) {
    this.main = main;
  }

  /************* глобальная отрисовка страницы ************* */

  public render() {
    window.onbeforeunload = function () {
      return false;
    };
    document.body.append(this.main);
  }

  /************* глобальная очистка страницы ************* */
  public cleanAppBody() {
    this.main.remove();

    document.body.innerHTML = "";

    document.body.append(this.main);
  }
}
