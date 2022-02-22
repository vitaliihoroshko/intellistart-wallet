import styles from '../components/Dashboard/styles.module.scss';
export const createDataToShow = (initialArray, categories, currentPage) => {
  const data = initialArray.slice(currentPage * 5 - 5, currentPage * 5).map(value => {
    return {
      ...value,
      categoryName: categories.find(category => category.id === value.categoryId)?.name,
      type: value.type === 'INCOME' ? '+' : '-',
      amount: ((Math.abs(value.amount) * 100) / 100)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      balanceAfter: ((value.balanceAfter * 100) / 100)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    };
  });
  return data;
};

export const chooseButtonsStyle = (currentPage, initialArray) => {
  let buttonBackClasses = [styles['pagination__buttons']];
  let buttonNextClasses = [styles['pagination__buttons']];
  let disabledBack = false;
  let disabledNext = false;

  if (currentPage === 1 && initialArray.length <= 5) {
    buttonBackClasses = [styles['pagination__displaynone']];
    buttonNextClasses = [styles['pagination__displaynone']];
  } else if (currentPage === 1 && initialArray.length > 5) {
    disabledBack = true;
    buttonBackClasses = [styles['pagination__buttons'], styles['pagination__back']];
  } else if (currentPage === Math.ceil(initialArray.length / 5)) {
    disabledNext = true;
    buttonNextClasses = [styles['pagination__buttons'], styles['pagination__next']];
  }

  return {
    buttonBackClasses: buttonBackClasses,
    buttonNextClasses: buttonNextClasses,
    disabledBack: disabledBack,
    disabledNext: disabledNext,
  };
};
