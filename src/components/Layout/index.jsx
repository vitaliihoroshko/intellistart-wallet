import { useState } from 'react';
import { node } from 'prop-types';

import Header from 'components/Header';
import AddTransactionsButton from 'components/Buttons/AddTransactionsButton';
import ModalAddTransaction from 'components/Modals/ModalAddTransaction';

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
  children: node.isRequired,
};

export default Layout;
