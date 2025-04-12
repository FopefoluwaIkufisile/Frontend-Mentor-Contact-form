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


if (localStorage.getItem("formdata")) {
  const formData = JSON.parse(localStorage.getItem("formdata"));
  firstname.value = formData["First name"] || "";
  lastname.value = formData["Last name"] || "";
  email.value = formData["Email Address"] || "";
  message.value = formData.message || "";
  consent.checked = formData.checkbox || false;

  radioBtns.forEach((btn) => {
    if (btn.id === formData.radioSelection) {
      btn.checked = true;
    }
  });
}

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
    localStorage.setItem(
      "formdata",
      JSON.stringify({
      "First name": firstname.value,
      "Last name": lastname.value,
      "Email Address": email.value,
      "message": message.value,
      "checkbox": consent.checked,
      "radioSelection": Array.from(radioBtns).find((btn) => btn.checked)?.id || ""
      })
    );
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
    });
  });
