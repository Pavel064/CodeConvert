function JsonToHtml(jsonData) {
  const { title, reference, verseObjects } = jsonData;

  const verseHtml = verseObjects
    .map((verse) => {
      const { urlImage, text, verse: verseNumber } = verse;
      return `
        <div class="verse">
          <div class="verse-image">
            <img src="${urlImage}" alt="">
          </div>
          <div class="verse-text">
            <div class="verse-number">${verseNumber}</div>
            <div class="verse-content">${text}</div>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="chapter">
      <div class="chapter-title">${title}</div>
      <div class="chapter-reference">${reference}</div>
      <div class="chapter-verses">${verseHtml}</div>
    </div>
  `;
}

export default JsonToHtml;
