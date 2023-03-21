### An example of converting an MD file to a JSON object

```jsx
import { MDtoJSON } from '@texttree/codeconvert-rcl';
import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';
import axios from 'axios';

function Component() {
  const url =
    'https://git.door43.org/ru_gl/ru_obs/raw/commit/e562a415f60c5262382ba936928f32479056310e/content/01.md';

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(url);
      const jsonData = MDtoJSON(data);
      setJsonData(jsonData);
    };

    fetchData();
  }, []);

  if (!jsonData) return <div>Loading...</div>;

  return <ReactJson src={jsonData} />;
}

<Component />;
```
