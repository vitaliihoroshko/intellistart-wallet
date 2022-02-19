export const evaluatePasswordProgress = (value, dataCallback, visibilityCallback) => {
  if (value.length === 6) {
    dataCallback({ progress: 10, tooltip: 'Password is very weak' });
  } else if (value.length === 7) {
    dataCallback({ progress: 20, tooltip: 'Password is weak' });
  } else if (value.length === 8) {
    dataCallback({ progress: 30, tooltip: 'Password is weak' });
  } else if (value.length === 9) {
    dataCallback({ progress: 50, tooltip: 'Password is average' });
  } else if (value.length === 10) {
    dataCallback({ progress: 70, tooltip: 'Password is average' });
  } else if (value.length === 11) {
    dataCallback({ progress: 90, tooltip: 'Password is strong enough' });
  } else if (value.length === 12) {
    dataCallback({ progress: 100, tooltip: 'Password is strong' });
  }
  if (value.length >= 6 && value.length <= 12) visibilityCallback(true);
  else visibilityCallback(false);
};

export const translateCatRuToEng = arr => {
  arr.map(value => {
    if (value.name === 'Доход') {
      value.name = 'Income';
    } else if (value.name === 'Основные расходы') {
      value.name = 'Basic expenses';
    } else if (value.name === 'Продукты') {
      value.name = 'Products';
    } else if (value.name === 'Машина') {
      value.name = 'Car';
    } else if (value.name === 'Забота о себе') {
      value.name = 'Self care';
    } else if (value.name === 'Забота о детях') {
      value.name = 'Child care';
    } else if (value.name === 'Товары для дома') {
      value.name = 'Household';
    } else if (value.name === 'Образование') {
      value.name = 'Education';
    } else if (value.name === 'Досуг') {
      value.name = 'Leisure';
    } else if (value.name === 'Другие расходы') {
      value.name = 'Other';
    } else if (value.name === 'Развлечения') {
      value.name = 'Entertainment';
    }
  });
};
