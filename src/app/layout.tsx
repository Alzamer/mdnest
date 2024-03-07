import Header from './components/Header';
import Footer from './components/Footer';
import Provider from './themes/Provider';

export const metadata = {
  title: 'MdNest',
  description: 'A platform to securely store and organize markdown-formatted submissions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header/>
          {children}
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}