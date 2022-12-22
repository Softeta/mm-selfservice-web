function waitForElement(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function insertBefore(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode)
}

if (document.readyState !== 'loading') {
  elementWaitingRoutine();
} else {
  document.addEventListener('DOMContentLoaded', function () {
    elementWaitingRoutine();
  });
}

function elementWaitingRoutine() {
  waitForElement('.heading').then(() => {
    const heading = document.querySelector(".heading");

    var backButton = document.createElement('div');
    backButton.type = 'div';
    backButton.id = 'go-back';
    backButton.className = 'back-control';
    backButton.onclick = () => {
      history.back();
    };
    insertBefore(heading, backButton);
  });
}