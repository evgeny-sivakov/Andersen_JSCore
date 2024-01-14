function operationStateHandler(action, state, buttonValue = null) {
  const { newActiveButton } = state;
  const currentActiveButton = document.getElementsByClassName('active')[0];

  state.operation = buttonValue ?? state.operation;

  switch (action) {
    case 'setOn':
      newActiveButton.classList.add('active');
      break;

    case 'update':
      currentActiveButton.classList.remove('active');
      newActiveButton.classList.add('active');
      break;

    case 'setOff':
      currentActiveButton.classList.remove('active');
      break;

    case 'reset':
      state.operation = '';
      currentActiveButton?.classList.remove('active');
      break;
  }
}

export { operationStateHandler };
