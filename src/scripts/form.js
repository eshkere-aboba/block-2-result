const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const form = document.querySelector('#form');
const button = document.querySelector('.form__btn');

const nameRegex = /^[А-Яа-яЁё\s]+$/;
const phoneRegex = /^\d+$/;
const emailRegex = /^[^\s@]+@[\w-]+(\.[\w-]+)+$/;

let formState = {
  name: {
    value: '',
    isValid: true,
  },
  phone: {
    value: '',
    isValid: true,
  },
  email: {
    value: '',
    isValid: true,
  },
};

const highlightInput = (input, isValid) => {
  if (isValid) {
    input.classList.remove('input--invalid');
    return;
  }

  input.classList.add('input--invalid');
};

const checkNameInputValidity = () => {
  if (!formState.name.value.length) {
    nameInput.setCustomValidity('Поле "Имя" обязательно для заполнения.');
    nameInput.reportValidity();
    formState.name.isValid = false;
    highlightInput(nameInput, false);
    return false;
  }

  if (!formState.name.value.match(nameRegex)) {
    nameInput.setCustomValidity('Имя должно содержать только русские буквы и пробелы.');
    nameInput.reportValidity();
    formState.name.isValid = false;
    highlightInput(nameInput, false);
    return false;
  }

  nameInput.setCustomValidity('');
  formState.name.isValid = true;
  highlightInput(nameInput, true);
  return true;
};

const checkPhoneInputValidity = () => {
  if (!formState.phone.value.length) {
    phoneInput.setCustomValidity('Поле "Телефон" обязательно для заполнения.');
    phoneInput.reportValidity();
    formState.phone.isValid = false;
    highlightInput(phoneInput, false);
    return false;
  }

  if (!formState.phone.value.match(phoneRegex)) {
    phoneInput.setCustomValidity('Телефон должен содержать только цифры.');
    phoneInput.reportValidity();
    formState.phone.isValid = false;
    highlightInput(phoneInput, false);
    return false;
  }

  phoneInput.setCustomValidity('');
  formState.phone.isValid = true;
  highlightInput(phoneInput, true);
  return true;
};

const checkEmailInputValidity = () => {
  if (!formState.email.value.length) {
    emailInput.setCustomValidity('Поле "Email" обязательно для заполнения.');
    emailInput.reportValidity();
    formState.email.isValid = false;
    highlightInput(emailInput, false);
    return false;
  }

  if (!formState.email.value.match(emailRegex)) {
    emailInput.setCustomValidity('Введите корректный email (например, test@mail.ru).');
    emailInput.reportValidity();
    formState.email.isValid = false;
    highlightInput(emailInput, false);
    return false;
  }

  emailInput.setCustomValidity('');
  formState.email.isValid = true;
  highlightInput(emailInput, true);
  return true;
};

nameInput.addEventListener('input', (event) => {
  formState.name.value = event.target.value;

  if (!formState.name.isValid) {
    checkNameInputValidity();
  }
});
phoneInput.addEventListener('input', (event) => {
  formState.phone.value = event.target.value;

  if (!formState.phone.isValid) {
    checkPhoneInputValidity();
  }
});
emailInput.addEventListener('input', (event) => {
  formState.email.value = event.target.value;

  if (!formState.email.isValid) {
    checkEmailInputValidity();
  }
});

const resetForm = () => {
  form.reset();

  formState = {
    name: {
      value: '',
      isValid: true,
    },
    phone: {
      value: '',
      isValid: true,
    },
    email: {
      value: '',
      isValid: true,
    },
  };
};

const checkFormValidity = () => {
  return checkNameInputValidity() && checkPhoneInputValidity() && checkEmailInputValidity();
};

button.addEventListener('click', () => {
  const isFormValid = checkFormValidity();

  if (!isFormValid) {
    return;
  }

  // eslint-disable-next-line
  console.log({
    name: formState.name.value,
    phone: formState.phone.value,
    email: formState.email.value,
  });
  resetForm();
});
