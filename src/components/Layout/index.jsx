import { node } from 'prop-types';

import Header from 'components/Header';
import AddTransactionsButton from 'components/Buttons/AddTransactionsButton';
import ModalAddTransaction from 'components/Modals/ModalAddTransaction';

const Layout = ({ children }) => {
  return (
    <>
      <ModalAddTransaction />
      <Header />
      <main>{children}</main>
      <AddTransactionsButton />
    </>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
