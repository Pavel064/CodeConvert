### An example of converting a JSON object back to an MD file

```jsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import axios from 'axios';

import { MdToJson, JsonToMd } from '@texttree/codeconvert-rcl';

function Component() {
  const url =
    'https://git.door43.org/ru_gl/ru_obs/raw/commit/e562a415f60c5262382ba936928f32479056310e/content/01.md';

  const [jsonData, setJsonData] = useState(null);
  const [mdData, setMdData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(url);

      const jsonData = MdToJson(data);
      setJsonData(jsonData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const generateMarkdown = async () => {
      if (jsonData) {
        const mdData = await JsonToMd(jsonData);
        setMdData(mdData);
      }
    };

    generateMarkdown();
  }, [jsonData]);

  // console.log(mdData?.slice(0, 100));
  // const sliced = mdData?.substring(0, 100);

  return !jsonData ? <div>Loading...</div> : <ReactMarkdown children={mdData} />;
}

<Component />;
```
