function JsonToPdf({ htmlData, htmlLang = 'ru', fileName = 'unnamed' }) {
  if (!htmlData) {
    throw new Error('No HTML data provided');
  }

  // Checking that htmlData is valid HTML
  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(htmlData, 'text/html');
  if (parsedHtml.querySelector('parsererror')) {
    throw new Error('Invalid HTML');
  }

  let new_window = window.open();
  new_window?.document.write(`<html lang="${htmlLang}">
  <head>
      <meta charset="UTF-8"/>
      <title>${fileName}</title>
      <style type="text/css">
        .break {
            page-break-after: always;
        }
    </style>
  </head>
  <body onLoad="window.print()">
      ${htmlData}
      </body>
      </html>`);
  new_window?.document.close();
}

export default JsonToPdf;
