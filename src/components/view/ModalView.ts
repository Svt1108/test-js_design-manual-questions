import { saveResult, createElementMy, showToast } from "../../helpers/helpers";
import { LoginPass } from "../../types/appRoutes";

export class ModalWindow {
  formModal?: HTMLFormElement;
  inputPassword?: HTMLInputElement;

  /************* отрисовка модального окна с паролем ************* */

  public createModal(
    invisibleWrapper: HTMLElement,
    invisible: HTMLElement,
    forCheck: HTMLElement,
    rightAnswersList: HTMLElement
  ): void {
    const modal = createElementMy("div") as HTMLDivElement;
    modal.classList.add("modal-wrap");
    document.body.append(modal);
    document.body.style.overflow = "hidden";
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.style.overflow = "";
      }
    };

    const modalWindow = createElementMy("div") as HTMLDivElement;
    modalWindow.classList.add("modal-window");
    modal.appendChild(modalWindow);

    const modalText = createElementMy("div");
    modalText.classList.add("modal-window__text");
    modalWindow.appendChild(modalText);

    modalText.innerHTML = `	
    <p class = "gray-text text-darken-4 modal-window__text">Enter the password:</p>	

    <form id="formModal">
    <div class="row">
      <div class="input-field col s12">
        <input id="password" type="password" class="validate" name="password" required>
        <label for="password" class="blue-text text-darken-3">Password</label>
      </div>
    </div>
    </form>`;

    this.inputPassword = document.getElementById(
      "password"
    ) as HTMLInputElement;
    this.inputPassword.focus();
    this.formModal = document.getElementById("formModal") as HTMLFormElement;
    this.formModal.onsubmit = (e) =>
      this.handleModal(
        e,
        modal,
        invisibleWrapper,
        invisible,
        forCheck,
        rightAnswersList
      );

    modalWindow.style.transform = `scale(1)`;
  }

  /************* обработка ввода пароля ************* */

  private handleModal(
    e: Event,
    modal: HTMLDivElement,
    invisibleWrapper: HTMLElement,
    invisible: HTMLElement,
    forCheck: HTMLElement,
    rightAnswersList: HTMLElement
  ) {
    e.preventDefault();

    const formData = new FormData(this.formModal);
    const password = formData.get("password");

    if (password === LoginPass.password) {
      /************* показывать список вопросов с ответами кандидата ************* */

      invisibleWrapper.appendChild(invisible);
      saveResult(invisibleWrapper, "protocol_auto");
      invisibleWrapper.appendChild(forCheck);
      saveResult(invisibleWrapper, "protocol_non_auto");
      invisibleWrapper.appendChild(rightAnswersList);
      saveResult(invisibleWrapper, "answers_list");
      modal.remove();
      document.body.style.overflow = "";
    } else {
      showToast("Wrong password :(");
    }
  }
}
