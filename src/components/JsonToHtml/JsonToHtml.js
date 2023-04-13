function JsonToHtml(jsonData, styleObj) {
  const { title, reference, verseObjects } = jsonData;

  const verseHtml = verseObjects
    .map((verse) => {
      const { urlImage, text } = verse;
      return `
        <div class="verse">
          <div class="verse-image">
            <img src="${urlImage}" alt="verse-image" style="${styleObj.image}">
          </div>
          <div class="verse-text">
            <div class="verse-content" style="${styleObj.paragraph}">${text}</div>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="content-wrapper" style="${styleObj.contentWrapper}">
      <div class="title" style="${styleObj.title}">${title}</div>
      <div class="verses" style="${styleObj.verses}">${verseHtml}</div>
      <div class="reference" style="${styleObj.reference}">${reference}</div>
    </div>
  `;
}

export default JsonToHtml;
