import { useState } from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import AddTransactionsButton from 'components/Buttons/AddTransactionsButton';
import ModalAddTransaction from 'components/ModalAddTransaction';

const Layout = ({ children }) => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <ModalAddTransaction active={modalActive} setActive={setModalActive} />
      <Header />
      <main>{children}</main>
      <AddTransactionsButton onClick={() => setModalActive(true)} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
