App link: https://svt1108.github.io/test-js_design-manual-questions/dist/

The program was written for programmer's testing. To not share the questions and the answers I changed its for "designer theme", so the questions is only an example.

Login is "user-test", password is "user-test" as well.

The program was written for using by two person: examiner and examinee. So the steps are:
1. The examiner fills login and password fields (page "login")
2. The examiner fills fields with info about examinee ("full name", "category" - for which position the examinee should pass the test, "additional information" - any kind of information, like previous position, for example). Test's themes and quantity of questions depend on chosen category. (page "fio")
3. The examiner can change default themes and quantity of questions to make test more specific (page "theme")
4. The examinee answers questions (he has 30 minutes) and finishes the test. There are some questions with options (for 2 points max) and some questions without options, where the examinee should write his own answer (for 10 points max)  (page "questions")
5. After the test is finished the examiner and the examinee can see the score for the part with automatic evaluation (page "result"), then the examiner open the modal window for check another part of questions (button "for examiner"). In this modal window he can see rigth answers hovering over the question index.
6. The examiner gives points for every question and finishes checking part.
7. It's possible to save the simple form of test's result (button Save). This form isn't secret, so examinee can see it. But as he shouldn't know right answers, three other forms (with detailed reports) can see and save only the examiner (button "Save extra") using the password (always "user-test" in this example).
8. As this app doesn't use any kind of database (to enable the app to run on any local computer without internet) all data is stored in local storage just for one examinee. But before run another test on page "fio" the examiner can see the result of previous examinee (the button "previous result")

Techologies used for the app:
1. Typescript
2. HTML/SCSS
3. Materialize framework
4. Webpack
5. Javascript-obfuscator

Features:
1. Questions and answers are a little bit encrypted with javascript-obfuscator to prevent reading code in devtools or in another way.
2. It's forbidden to return from page "result" to page "questions"
3. To close web page with app user must confirm that he wants to leave the page
