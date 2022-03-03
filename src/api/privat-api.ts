import axios, { AxiosResponse } from 'axios';

import { Currency } from 'common/interfaces';

const usd = 'USD';
const eur = 'EUR';
const rur = 'RUR';

const privatUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11';

const getCurrency = async (): Promise<Currency[]> => {
  const response: AxiosResponse<Currency[]> = await axios.get(privatUrl);
  return response.data;
};

export { usd, eur, rur, getCurrency };
