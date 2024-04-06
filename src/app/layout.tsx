import 'semantic-ui-css/semantic.min.css'
import './global.css';
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Whisper&display=swap" rel="stylesheet"/>
      </head>
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