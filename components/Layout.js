// Components
import Header from './Layout/Header/Header';
import Seo from './Seo';

export default function Layout({ children, connect, address, disconnect }) {
  return (
    <>
      <Seo />
      <Header 
        connect={connect}
        address={address}
        disconnect={disconnect}
      />
      {children}
    </>
  )
}
