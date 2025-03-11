import { useState, useCallback, useEffect } from 'react';
import { Grid2 } from "@mui/material";
import { JsonEditor } from 'json-edit-react'
import { getAndSetJson } from "pithekos-lib";

function App() {
    const [i18nData, setI18nData] = useState({});
  const [maxWindowHeight, setMaxWindowHeight] = useState(window.innerHeight - 64);
  const handleWindowResize = useCallback(event => {
    setMaxWindowHeight(window.innerHeight - 64);
  }, []);

  const doFetchI18n = () => {
      getAndSetJson({
          url: "/i18n/raw",
          setter: setI18nData
      })
  }

  useEffect(
      () => doFetchI18n(),
      []
  );

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
        window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return <Grid2 container spacing={2} sx={{ maxHeight: maxWindowHeight }}>
      <Grid2 size={12}>
          <JsonEditor
              data={ i18nData }
              setData={ setI18nData }
          />
      </Grid2>
  </Grid2>
}

export default App;
