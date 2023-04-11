import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function JsonToPdf({ data, styles }) {
  const generatePdf = () => {
    const docDefinition = {
      content: [{ text: data.title, style: 'title' }, { text: '\n\n' }],
      styles: {
        title: { fontSize: 18, bold: true, alignment: 'center' },
        reference: { fontSize: 14, bold: true, alignment: 'center' },
        verse: { fontSize: 12, margin: [0, 0, 0, 10] },
        image: { margin: [0, 10, 0, 10], alignment: 'center' },
        text: { fontSize: 12, margin: [0, 0, 0, 10] },
        ...styles,
      },
    };

    const getImageDataUrl = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const addVerseObjects = async () => {
      for (const verseObject of data.verseObjects) {
        // docDefinition.content.push({
        //   text: `стих ${verseObject.verse}`,
        //   style: 'verse',
        // });

        if (verseObject.urlImage) {
          const imageDataUrl = await getImageDataUrl(verseObject.urlImage);
          docDefinition.content.push({
            image: imageDataUrl,
            style: 'image',
          });
        }

        if (verseObject.text) {
          docDefinition.content.push({
            text: verseObject.text,
            style: 'text',
          });
        }
      }
      docDefinition.content.push({ text: data.reference, style: 'reference' });
    };

    addVerseObjects().then(() => {
      pdfMake.createPdf(docDefinition).open();
    });
  };

  return (
    <div>
      <button onClick={generatePdf}>Создать PDF</button>
    </div>
  );
}

export default JsonToPdf;
