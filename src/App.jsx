import {useContext, useState} from 'react';
import {Grid2} from "@mui/material";
import { JsonEditor } from 'json-edit-react'
import {i18nContext, doI18n} from "pithekos-lib";

function App() {
    const i18n = useContext(i18nContext);
    const [i18nData, setI18nData] = useState(i18n);
    return <Grid2 container spacing={2}>
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
