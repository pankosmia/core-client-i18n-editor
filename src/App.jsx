import {useState, useCallback, useEffect, useContext} from 'react';
import {Box, Button} from "@mui/material";
import {JsonEditor} from 'json-edit-react'
import {getAndSetJson, postJson, debugContext, i18nContext, SpSpaPage, doI18n} from "pithekos-lib";

function App() {
    const {debugRef} = useContext(debugContext);
    const {i18nRef} = useContext(i18nContext);
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
                backgroundColor: 'inherited',
                fontFamily: 'inherited',
                fontSize: "xx-large",
                color: "#441650"
            },
            property: "#441650",
            string: '#000',
            bracket: {display: "none"},
            collection: {fontSize: "smaller", color: "#441650"},
            iconCollection: '#441650',
            iconEdit: '#441650',
            iconDelete: '#AA0000',
            iconAdd: '#441650',
            iconCopy: '#441650',
            iconOk: '#441650',
            iconCancel: '#AA0000',
            input: ['#000', { fontSize: '100%' }],
            inputHighlight: '#EECCFF',
        },
    }

    const restrictEditFilter = ({value}) => typeof value !== "string";
    const restrictAddFilter = ({value}) => value && ((typeof value !== "object") || Object.values(value).filter(o => typeof o !== "string").length > 0);
    const restrictDeleteFilter = ({
                                      value,
                                      parentData
                                  }) => (typeof value !== "string") || (Object.keys(parentData).length === 1);
    return <SpSpaPage
        requireNet={false}
        titleKey="pages:i18n-editor:title"
        currentId="i18n-editor"
    >
        <Box sx={{maxHeight: maxWindowHeight}} className={fontClass.font_set}>
            <JsonEditor
                data={i18nData}
                setData={setI18nData}
                theme={panksomsiaTheme}
                rootName="i18n"
                showStringQuotes={false}
                onUpdate={() => setUnsavedData(true)}
                onCopy={() => {
                }}
                restrictDrag={true}
                restrictEdit={restrictEditFilter}
                restrictAdd={restrictAddFilter}
                restrictDelete={restrictDeleteFilter}
                restrictTypeSelection={() => ["string"]}
                defaultValue="???"
                showCollectionCount="when-closed"
                icons={{copy: <span></span>}}
            />
        </Box>
        <Button
            sx={{color: unsavedData ? '#FFF' : '#AAA', ml: 2, position: "absolute", top: "75px", right: "50px"}}
            color="primary"
            size="large"
            variant="contained"
            aria-label="save"
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
            }
        >
            {doI18n("pages:i18n-editor:save_button", i18nRef.current)}
        </Button>
    </SpSpaPage>
}

export default App;
