export const COUNT_SECONDS = 1810; // = 2 hours 10 sec;

const currentUrl = window.location.href;

export const IMG_PATH = `${currentUrl.slice(
  0,
  currentUrl.lastIndexOf("/") + 1
)}assets/images/screenshots/`;

export const IMG_PATH_ANSW = `${currentUrl.slice(
  0,
  currentUrl.lastIndexOf("/") + 1
)}assets/images/screenshots_answ/`;

export const PROGRAM_NAME = "SkillCheck";
