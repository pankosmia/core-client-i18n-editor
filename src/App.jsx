import {useState, useEffect, useContext} from 'react';
import {Box, Button} from "@mui/material";
import {JsonEditor} from 'json-edit-react'
import {getAndSetJson, postJson, debugContext, i18nContext, typographyContext, SpSpaPage, doI18n} from "pithekos-lib";
import {IconAdd, IconClose, IconDelete, IconDone, IconEdit} from "./icons";
import GraphiteTest from './components/GraphiteTest';

function App() {
    const {debugRef} = useContext(debugContext);
    const {i18nRef} = useContext(i18nContext);
    const { typographyRef } = useContext(typographyContext);
    const [i18nData, setI18nData] = useState({});
    const [unsavedData, setUnsavedData] = useState(false);

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

    const isGraphite = GraphiteTest()
    /** adjSelectedFontClass reshapes selectedFontClass if Graphite is absent. */
    const adjSelectedFontClass = isGraphite ? typographyRef.current.font_set : typographyRef.current.font_set.replace(/Pankosmia-AwamiNastaliq(.*)Pankosmia-NotoNastaliqUrdu/ig, 'Pankosmia-NotoNastaliqUrdu');

    const panksomsiaTheme = {
        styles: {
            container: {
                padding: '0 16px 0 48px',
                backgroundColor: 'inherited',
                fontFamily: '',
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
            input: ['#000', {fontSize: '100%'}],
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
        <Box sx={{ mb: 2, position: 'fixed', top: '64px', bottom: 0, right: 0, overflow: 'scroll', width: '100%' }} className={adjSelectedFontClass}>
            {i18nRef.current["pages:i18n-editor:single_translation"] &&
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
                icons={{
                    copy: <span></span>,
                    add: IconAdd,
                    cancel: IconClose,
                    delete: IconDelete,
                    ok: IconDone,
                    edit: IconEdit,
                }}
                translations={{
                    ITEM_SINGLE: doI18n("pages:i18n-editor:single_translation", i18nRef.current),
                    ITEMS_MULTIPLE: doI18n("pages:i18n-editor:multiple_translations", i18nRef.current),
                    KEY_NEW: doI18n("pages:i18n-editor:translation_new", i18nRef.current),
                    KEY_SELECT: doI18n("pages:i18n-editor:translation_select", i18nRef.current),
                    NO_KEY_OPTIONS: doI18n("pages:i18n-editor:no_translation_options", i18nRef.current),
                    ERROR_KEY_EXISTS: doI18n("pages:i18n-editor:error_translation_exists", i18nRef.current),
                    ERROR_INVALID_JSON: doI18n("pages:i18n-editor:invalid_json", i18nRef.current),
                    ERROR_UPDATE: doI18n("pages:i18n-editor:error_update", i18nRef.current),
                    ERROR_DELETE: doI18n("pages:i18n-editor:error_delete", i18nRef.current),
                    ERROR_ADD: doI18n("pages:i18n-editor:error_add", i18nRef.current),
                    SHOW_LESS: doI18n("pages:i18n-editor:show_less", i18nRef.current),
                }}
            />
            }
        </Box>
        <Button
            sx={{color: unsavedData ? '#FFF' : '#AAA', ml: 2, position: "absolute", top: "64px", right: "50px"}}
            color="secondary"
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
