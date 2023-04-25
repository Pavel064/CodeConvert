import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function MdToZip(markdown) {
  const zip = new JSZip();

  // Создаем файл README.md в архиве и добавляем в него содержимое markdown
  zip.file('README.md', markdown);

  // Генерируем и скачиваем архив
  zip.generateAsync({ type: 'blob' }).then((blob) => {
    saveAs(blob, 'my-zip-archive.zip');
  });
}

export default MdToZip;
