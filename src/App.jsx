import {useState, useCallback, useEffect, useContext} from 'react';
import {Grid2, Button} from "@mui/material";
import {JsonEditor} from 'json-edit-react'
import {getAndSetJson, postJson, debugContext} from "pithekos-lib";

function App() {
    const {debugRef} = useContext(debugContext);
    const [i18nData, setI18nData] = useState({});
    const [unsavedData, setUnsavedData] = useState(false);
    const [fontClass, setFontClass] = useState([]);
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

    useEffect(
        () => {
            getAndSetJson({
                url: "/settings/typography",
                setter: setFontClass
            }).then()
        },
        []
    );

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    const panksomsiaTheme = {
        styles: {
            container: {
                backgroundColor: '',
                fontFamily: '',
            },
            string: 'purple',
        },
    }

    const restrictEditFilter = ({value}) => typeof value !== "string";
    const restrictAddFilter = ({value}) => value && ((typeof value !== "object") || Object.values(value).filter(o => typeof o !== "string").length > 0);
    const restrictDeleteFilter = ({
                                      value,
                                      parentData
                                  }) => (typeof value !== "string") || (Object.keys(parentData).length === 1);

    return <Grid2 container spacing={2} sx={{maxHeight: maxWindowHeight}} className={fontClass.font_set}>
        <Grid2 item size={12}>
            <Button
                variant="contained"
                disabled={!unsavedData}
                onClick={
                    () => {
                        postJson(
                            "/i18n",
                            JSON.stringify(i18nData, null, 2),
                            debugRef.current
                        )
                            .then(() => setUnsavedData(false));
                    }
                }>
                Save
            </Button>
        </Grid2>
        <Grid2 item size={12}>
            <JsonEditor
                data={i18nData}
                setData={setI18nData}
                theme={panksomsiaTheme}
                rootName="i18n"
                showStringQuotes={false}
                onUpdate={() => setUnsavedData(true)}
                restrictDrag={true}
                restrictEdit={restrictEditFilter}
                restrictAdd={restrictAddFilter}
                restrictDelete={restrictDeleteFilter}
                restrictTypeSelection={["string"]}
                defaultValue="???"
            />
        </Grid2>
    </Grid2>
}

export default App;
