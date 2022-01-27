import Header from 'components/Header';
import Currency from 'components/Currency';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Currency />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
