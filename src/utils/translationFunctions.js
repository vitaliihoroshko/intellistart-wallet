export const translateCategoryNames = array => {
  const translatedArray = array.map(value => {
    if (value.name === 'Доход') return { ...value, name: 'Income' };
    else if (value.name === 'Основные расходы') return { ...value, name: 'Basic expenses' };
    else if (value.name === 'Продукты') return { ...value, name: 'Products' };
    else if (value.name === 'Машина') return { ...value, name: 'Car' };
    else if (value.name === 'Забота о себе') return { ...value, name: 'Self care' };
    else if (value.name === 'Забота о детях') return { ...value, name: 'Child care' };
    else if (value.name === 'Товары для дома') return { ...value, name: 'Household' };
    else if (value.name === 'Образование') return { ...value, name: 'Education' };
    else if (value.name === 'Досуг') return { ...value, name: 'Leisure' };
    else if (value.name === 'Другие расходы') return { ...value, name: 'Other' };
    else if (value.name === 'Развлечения') return { ...value, name: 'Entertainment' };
  });
  return translatedArray;
};
