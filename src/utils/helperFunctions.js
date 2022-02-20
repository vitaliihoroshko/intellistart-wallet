export const makeQueryParams = object => {
  const elements = [];
  const params = Object.keys(object);
  for (const param of params) {
    const value = object[param];
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

export const transformTransactionsSummary = data => {
  const transformedData = {
    ...data,
    expenseSummary: Math.abs(data.expenseSummary),
    categoriesSummary: data.categoriesSummary?.map(value => ({
      ...value,
      total: Math.abs(value.total),
    })),
  };
  return transformedData;
};
