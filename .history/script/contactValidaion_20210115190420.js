(function () {
  "use strict";

  const checkIcon = "fa-check-circle";
  const errorIcon = "fa-exclamation-circle";

  const form = document.querySelector("#form");
  const nameInput = document.querySelector("#fname");
  const emailInput = document.querySelector("#femail");
  const messageInput = document.querySelector("#subject");
  const button = document.querySelector("#submit");
  let generalError = document.querySelector("#general-error");
  let emailError = document.querySelector("#email-error");

  let isNotEmptyOrInvalid = (value) => {
    return Boolean(value);
  };

  let isValidEmail = (email) => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(String(email).toLowerCase());
  };

  // a helper function to add events to multiple elements
  let addEvents = (tags, event, func) => {
    tags.forEach((tag) => {
      tag.addEventListener(event, func);
    });
  };

  addEvents([nameInput, emailInput, messageInput], "input", handleChange);
  addEvents([form], "submit", handleSubmission);

  let isReadyToSubmit = (elements, email) => {
    let foundError = elements.map((el) => isNotEmptyOrInvalid(el));
    let isEmail = isValidEmail(email);
    foundError.includes(false) || !isEmail
      ? handleGeneralError()
      : !isEmail && handleEmailError();

    if (foundError.includes(false)) {
      handleGeneralError();
      return false;
    } else if (!isEmail) {
      handleEmailError();
    } else {
      return true;
    }
  };

  //check if error icon exists remove it and add green icon
  function handleValidInputStyle(inputField, i) {
    if (i.classList.contains(errorIcon)) {
      i.classList.remove(errorIcon, "red");
      inputField.classList.remove("red-border");
    }

    i.classList.add(checkIcon, "green");
    inputField.classList.add("green-border");
  }

  //check if green icon exists remove it
  function handleInvalidInputStyle(inputField, i) {
    if (i.classList.contains(checkIcon)) {
      i.classList.remove(checkIcon);
      inputField.classList.remove("green-border");
    }

    i.classList.add(errorIcon, "red");
    inputField.classList.add("red-border");
  }

  function handleChange(e) {
    //remove errors
    generalError.innerHTML = "";
    generalError.classList.remove("red-border", "error");
    emailError.innerHTML = "";

    let parentDiv = e.target.parentElement;
    const i = parentDiv.querySelector(".icon");

    if (e.target.id === "femail") {
      isValidEmail(e.target.value)
        ? handleValidInputStyle(e.target, i)
        : handleInvalidInputStyle(e.target, i);
    } else {
      isNotEmptyOrInvalid(e.target.value)
        ? handleValidInputStyle(e.target, i)
        : handleInvalidInputStyle(e.target, i);
    }
  }

  function handleSubmission(e) {
    e.preventDefault();
    if (
      isReadyToSubmit([nameInput.value, messageInput.value], emailInput.value)
    ) {
      button.innerHTML = "Sent!";
      reset(nameInput, emailInput, messageInput);
      setTimeout(() => (button.innerHTML = "Submit"), 2000);
    }
  }
  function reset(...args) {
    args.forEach((arg) => {
      arg.value = "";

      arg.classList.remove("green-border");
      arg.parentElement.querySelector(".icon").classList.remove(checkIcon);
    });
  }

  function handleGeneralError() {
    generalError.innerHTML = "Please fill in all the fields";
    generalError.classList.add("red-border", "error");
  }

  function handleEmailError() {
    emailError.innerHTML = "Please fill in a valid email";
  }
})();
