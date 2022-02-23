import axios from 'axios';

const usd = 'USD';
const eur = 'EUR';
const rur = 'RUR';

const privatUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

const getCurrency = async () => {
  const response = await axios.get(privatUrl);
  return response.data;
};

export { usd, eur, rur, getCurrency };
