import { node } from 'prop-types';

import Header from 'components/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
