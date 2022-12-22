if (document.readyState !== 'loading') {
  formElementWaitingRoutine();
} else {
  document.addEventListener('DOMContentLoaded', function () {
    formElementWaitingRoutine();
  });
}

function formElementWaitingRoutine() {
  waitForElement("input[id='password']").then(() => {
    waitForElement(".password-label").then(() => {
      const passwordInput = document.querySelector("input[id='password']");
      const passwordLabel = document.querySelector(".password-label");
      insertAfter(passwordInput, passwordLabel);
    });
  });
}