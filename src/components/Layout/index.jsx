import Header from 'components/Header';
import PropTypes from 'prop-types';
import AddTransactionsButton from 'components/Buttons/AddTransactionsButton';

const Layout = ({ children }) => {
  return (
    <>
      <AddTransactionsButton />
      <Header />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
