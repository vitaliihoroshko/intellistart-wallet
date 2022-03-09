import { Transaction, TransactionCategory, ButtonsStyles } from 'common/interfaces';
import { TransactionType, TransformedTransaction } from 'common/types';
import styles from 'components/Dashboard/styles.module.scss';

export const createDataToShow = (
  initialArray: Transaction[],
  categories: TransactionCategory[],
  currentPage: number,
): TransformedTransaction[] => {
  const data = initialArray.slice(currentPage * 5 - 5, currentPage * 5).map(value => {
    return {
      ...value,
      categoryName: categories.find(category => category.id === value.categoryId)?.name!,
      type: value.type === 'INCOME' ? ('+' as TransactionType) : ('-' as TransactionType),
      amount: ((Math.abs(+value.amount) * 100) / 100)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      balanceAfter: ((+value.balanceAfter * 100) / 100)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    };
  });
  return data;
};

export const chooseButtonsStyle = (
  currentPage: number,
  initialArray: Transaction[],
): ButtonsStyles => {
  let buttonBackClasses: string[] = [styles['pagination__buttons']];
  let buttonNextClasses: string[] = [styles['pagination__buttons']];
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
    buttonBackClasses,
    buttonNextClasses,
    disabledBack,
    disabledNext,
  };
};
