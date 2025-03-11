import { useContext, useState, useCallback, useEffect } from 'react';
import { Grid2 } from "@mui/material";
import { JsonEditor } from 'json-edit-react'
import { i18nContext, doI18n } from "pithekos-lib";

function App() {
  const [maxWindowHeight, setMaxWindowHeight] = useState(window.innerHeight - 64);
  const handleWindowResize = useCallback(event => {
    setMaxWindowHeight(window.innerHeight - 64);
  }, []);
  const i18n = useContext(i18nContext);
  const [i18nData, setI18nData] = useState(i18n);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
        window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return <Grid2 container spacing={2} sx={{ maxHeight: maxWindowHeight }}>
      <Grid2 size={12}>
          <h1>{doI18n("pages:i18n-editor:stub_content", i18n)}</h1>
          <JsonEditor
              data={ i18nData }
              setData={ setI18nData }
          />
      </Grid2>
  </Grid2>
}

export default App;
