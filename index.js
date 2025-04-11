const submitBtn = document.querySelector(".submit");
const successModal = document.querySelector(".message-sent-div");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const consent = document.querySelector("#consent");
const radioBtns = document.querySelectorAll('input[type="radio"]');
const error = document.querySelectorAll(".error");
const radioError = document.querySelector(".query-type-container small");
const consentError = document.querySelector(".consent-div small");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let isValid = true;

  const formFields = [firstname, lastname, email, message];

  formFields.forEach((field) => {
    const me = field;
    const parent = field.closest("div");
    const small = parent.querySelector("small");

    if (!field.value.trim()) {
      me.style.border = "1px solid var(--red)";
      small.style.display = "block";
      isValid = false;
    } else {
      small.style.display = "none";
      me.style.border = "1px solid var(--grey-900)";
    }
  });

  let oneChecked = false;

  radioBtns.forEach((btn) => {
    if (btn.checked) {
      oneChecked = true;
    }
  });

  if (oneChecked === false) {
    radioError.style.display = "block";
    isValid = false;
  } else {
    radioError.style.display = "none";
  }
  if (consent.checked === false) {
    consentError.style.display = "block";
    isValid = false;
  } else {
    consentError.style.display = "none";
  }
  if (isValid) {
    successModal.style.top = "20px";
    successModal.classList.add("shake");
    setTimeout(() => {
      successModal.style.top = "-200px";
      successModal.classList.remove("shake");
    }, 2000);
  }
});

document
  .querySelectorAll(".general-enquiry-div, .support-request-div")
  .forEach((div) => {
    div.addEventListener("click", () => {
      const radioBtn = div.querySelector('input[type="radio"]');
      radioBtn.checked = true;
      console.log(radioBtn);
    });
  });
