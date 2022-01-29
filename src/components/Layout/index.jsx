import Header from 'components/Header';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
