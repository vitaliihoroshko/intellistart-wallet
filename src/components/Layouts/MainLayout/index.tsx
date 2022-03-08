import { FunctionComponent } from 'react';

import Header from 'components/Header';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
