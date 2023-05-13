
import { Html, Head, Main, NextScript } from 'next/document';
import { CookiesProvider } from 'react-cookie';
 
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
      <CookiesProvider>
        <div className="min-h-screen flex-col items-center justify-between p-24">
          <Main />
        </div>
      </CookiesProvider>
      <NextScript />
      </body>
    </Html>
  );
}
