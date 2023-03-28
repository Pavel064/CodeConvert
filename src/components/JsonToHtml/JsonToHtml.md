```jsx
import { useState, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';
import axios from 'axios';

import { MdToJson, JsonToHtml } from '@texttree/codeconvert-rcl';

function Component() {
  const url =
    'https://git.door43.org/ru_gl/ru_obs/raw/commit/e562a415f60c5262382ba936928f32479056310e/content/30.md';

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

  console.log(htmlData);

  return !jsonData ? (
    <div>Loading...</div>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: htmlData }} />
  );
}

<Component />;
```
