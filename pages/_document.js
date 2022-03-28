import Document, { Html, Head, Main, NextScript } from 'next/document'

let pathname;

const getBodyClass = ({ pathname }) => {
  switch(pathname) {
    case '/queensauction':
      return 'md:bg-background-auction bg-background-auction-mobile';
    default:
      return 'md:bg-background-home bg-background-home-mobile';
  }
};

class MyDocument extends Document {

  static async getInitialProps(ctx) {
    if (ctx?.req && ctx?.res) {
      const initialProps = await Document.getInitialProps(ctx);
      pathname = ctx.pathname;
      return { ...initialProps };
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" 
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className={getBodyClass({ pathname })}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument