import axios from 'axios';

let usd = 'USD';
let eur = 'EUR';
let rur = 'RUR';

const privatUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
const apiCall = async () => {
  const response = await axios.get(privatUrl);
  return response.data;
};

export { usd, eur, rur, apiCall };
