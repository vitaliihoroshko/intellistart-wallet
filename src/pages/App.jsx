import Layout from 'components/Layout';
import Currency from 'components/Currency';
import ButtonAddTransactions from 'components/Buttons/ButtonAddTransactions';

const App = () => {
  return (
    <Layout>
      <Currency />
      <ButtonAddTransactions />
    </Layout>
  );
};

export default App;
