import {
  Period,
  TransactionsSummary,
  CategorySummary,
  SelectOption,
  CategoryColors,
} from 'common/interfaces';

export const makeQueryParams = (period: Period): string => {
  const elements: string[] = [];
  for (const param in period) {
    const value = period[param as keyof Period];
    if (value) {
      const element = `${param}=${value}`;
      elements.push(element);
    }
  }
  if (!elements.length) return '';
  const filteredElements = elements.filter(value => value.startsWith('year'));
  const currentYear = new Date().getFullYear();
  if (!filteredElements.length) elements.push(`year=${currentYear}`);
  return `?${elements.join('&')}`;
};

export const transformTransactionsSummary = (data: TransactionsSummary): TransactionsSummary => {
  const transformedData = {
    ...data,
    expenseSummary: Math.abs(data.expenseSummary),
    categoriesSummary: data.categoriesSummary?.map((value: CategorySummary) => ({
      ...value,
      total: Math.abs(value.total),
    })),
  };
  return transformedData;
};

export const getMonths = (): SelectOption[] => {
  return [
    { title: 'January', value: 1 },
    { title: 'February', value: 2 },
    { title: 'March', value: 3 },
    { title: 'April', value: 4 },
    { title: 'May', value: 5 },
    { title: 'June', value: 6 },
    { title: 'July', value: 7 },
    { title: 'August', value: 8 },
    { title: 'September', value: 9 },
    { title: 'October', value: 10 },
    { title: 'November', value: 11 },
    { title: 'December', value: 12 },
  ];
};

export const getYears = (): SelectOption[] => {
  const time = new Date();
  const year = time.getFullYear();
  const array = [];

  for (let i = 2015; i <= year; i++) {
    const object = { title: i, value: i };
    array.push(object);
  }

  return array;
};

export const getСategoryColors = (): CategoryColors => {
  return {
    income: '#00AD84',
    education: '#81E1FF',
    'household products': '#4A56E2',
    products: '#FFD8D0',
    entertainment: '#DA0606',
    car: '#FD9498',
    'other expenses': '#112277',
    'child care': '#6E78E8',
    'self care': '#C5BAFF',
    leisure: '#24CCA7',
    'main expenses': '#FED057',
  };
};

export const roundNumber = (number: number): number => +(Math.round(number * 100) / 100).toFixed(2);
