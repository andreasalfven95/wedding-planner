import Document, { Html, Head, Main, NextScript } from 'next/document'
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet()

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    )

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement()

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta
            name='description'
            /* content='A website for all of those who are planning their big day. Here you can find venues, locations, services etc.' */
            content='En hemsida som hjälper er att hitta vad ni behöver för er stora dag. Här hittar ni Festlokaler, Fotografer, Florister, Bröllopsplanerare och Brudsalonger till erat bröllop.'
          ></meta>
          {/*  <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          ></meta> */}
          <meta charSet='UTF-8'></meta>
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='preconnect' href='https://fonts.gstatic.com'></link>
          <link
            href='https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;500;600&family=Raleway:wght@200;400;600&display=swap'
            rel='stylesheet'
          ></link>

          {/* <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            crossorigin=""/> */}

          <script
            src='https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
            integrity='sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=='
            crossorigin=''
          ></script>

          <script src='https://code.jquery.com/jquery-3.5.1.slim.min.js'></script>

          <script src={process.env.PLACES_API_URL}></script>
          {/* <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDP_RH7igmMV9aDg3qdGafju2UByCafNnA&libraries=places'></script> */}

          {/* <script src='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js'></script> */}

          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
