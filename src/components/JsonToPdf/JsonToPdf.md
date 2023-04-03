### An example of converting a JSON object to PDF

```jsx
import { useState, useEffect } from 'react';
import { MdToJson, JsonToHtml, JsonToPdf } from '@texttree/codeconvert-rcl';
import axios from 'axios';

function Component() {
  const url =
    'https://git.door43.org/ru_gl/ru_obs/raw/commit/e562a415f60c5262382ba936928f32479056310e/content/41.md';

  const [jsonData, setJsonData] = useState(null);
  const [htmlData, setHtmlData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(url);

      const jsonData = MdToJson(data);
      setJsonData(jsonData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const generateHtml = async () => {
      if (jsonData) {
        const htmlData = await JsonToHtml(jsonData);
        setHtmlData(htmlData);
      }
    };

    generateHtml();
  }, [jsonData]);

  const handlePdfCreation = () => {
    try {
      JsonToPdf({ htmlData });
    } catch (error) {
      console.error(error);
      alert('Error creating PDF!');
    }
  };

  return (
    <div className="Component">
      {jsonData ? (
        <button onClick={handlePdfCreation}>Create PDF</button>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

<Component />;
```
