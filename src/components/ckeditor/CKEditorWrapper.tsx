import React, {useState, useEffect, useRef} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    ClassicEditor,
    AccessibilityHelp,
    Alignment,
    Autoformat,
    AutoImage,
    AutoLink,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    BlockToolbar,
    Bold,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    HorizontalLine,
    ImageBlock,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageToolbar,
    ImageUpload,
    Italic,
    Link,
    List,
    ListProperties,
    Markdown,
    Mention,
    Paragraph,
    PasteFromMarkdownExperimental,
    PasteFromOffice,
    RemoveFormat,
    SelectAll,
    ShowBlocks,
    SimpleUploadAdapter,
    SpecialCharacters,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Title,
    TodoList,
    Underline,
    Undo, EditorConfig, Base64UploadAdapter, ImageStyle, ImageTextAlternative
} from 'ckeditor5';
// import translations from "ckeditor5/translations/vi.js";
import 'ckeditor5/ckeditor5.css';
import '../../App.css';
import {Box, Button, SxProps, Theme} from "@mui/material";
import {styled} from "@mui/material/styles";
import PreviewPlugin from "./PreviewPlugin";

const BoxEditor = styled(Box)(({theme}) => ({
    '& .ck-editor__main > .ck-editor__editable': {
        minHeight: '300px',
        overflow: 'auto'
    },
    '& .editor-container_classic-editor .editor-container__editor': {
        minWidth: 'unset',
        maxWidth: 'unset',
        overflow: 'auto'
    }
}));

interface CKEditorWrapperProps {
    data: string;
    onChange: (event: any, editor: any) => void;
    onReady: (editor: any) => void;
    editorProps?: SxProps<Theme>;
    containerProps?: SxProps<Theme>;
}

const editorConfig : EditorConfig = {
    toolbar: {
        items: [
            'undo',
            'redo',
            '|',
            'preview',
            '|',
            'showBlocks',
            'findAndReplace',
            'selectAll',
            '|',
            'heading',
            'style',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'subscript',
            'superscript',
            'removeFormat',
            '|',
            'specialCharacters',
            'horizontalLine',
            'link',
            'insertImage',
            'insertTable',
            'blockQuote',
            '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            '|',
            'accessibilityHelp'
        ],
        shouldNotGroupWhenFull: false
    },
    extraPlugins: [
        PreviewPlugin,
    ],
    plugins: [
        AccessibilityHelp,
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        BlockToolbar,
        Bold,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Heading,
        HorizontalLine,
        ImageBlock,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Italic,
        Link,
        List,
        ListProperties,
        // Markdown,
        Mention,
        Paragraph,
        // PasteFromMarkdownExperimental,
        PasteFromOffice,
        RemoveFormat,
        SelectAll,
        ShowBlocks,
        // SimpleUploadAdapter,
        Base64UploadAdapter,
        SpecialCharacters,
        Style,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        // Title,
        TodoList,
        Underline,
        Undo,
    ],
    balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
    // blockToolbar: [
    //     'fontSize',
    //     'fontColor',
    //     'fontBackgroundColor',
    //     '|',
    //     'bold',
    //     'italic',
    //     '|',
    //     'link',
    //     'insertImage',
    //     'insertTable',
    //     '|',
    //     'bulletedList',
    //     'numberedList'
    // ],
    fontFamily: {
        supportAllValues: true
    },
    fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true
    },
    heading: {
        options: [
            {
                model: 'paragraph',
                title: 'Paragraph',
                class: 'ck-heading_paragraph'
            },
            {
                model: 'heading1',
                view: 'h1',
                title: 'Heading 1',
                class: 'ck-heading_heading1'
            },
            {
                model: 'heading2',
                view: 'h2',
                title: 'Heading 2',
                class: 'ck-heading_heading2'
            },
            {
                model: 'heading3',
                view: 'h3',
                title: 'Heading 3',
                class: 'ck-heading_heading3'
            },
            {
                model: 'heading4',
                view: 'h4',
                title: 'Heading 4',
                class: 'ck-heading_heading4'
            },
            {
                model: 'heading5',
                view: 'h5',
                title: 'Heading 5',
                class: 'ck-heading_heading5'
            },
            {
                model: 'heading6',
                view: 'h6',
                title: 'Heading 6',
                class: 'ck-heading_heading6'
            }
        ]
    },
    htmlSupport: {
        allow: [
            {
                name: /^.*$/,
                styles: true,
                attributes: true,
                classes: true
            }
        ]
    },
    image: {
        toolbar: ['imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage']        },
    link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                    download: 'file'
                }
            }
        }
    },
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true
        }
    },
    mention: {
        feeds: [
            {
                marker: '@',
                feed: [
                    /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
                ]
            }
        ]
    },
    placeholder: 'Type or paste your content here!',
    style: {
        definitions: [
            {
                name: 'Article category',
                element: 'h3',
                classes: ['category']
            },
            {
                name: 'Title',
                element: 'h2',
                classes: ['document-title']
            },
            {
                name: 'Subtitle',
                element: 'h3',
                classes: ['document-subtitle']
            },
            {
                name: 'Info box',
                element: 'p',
                classes: ['info-box']
            },
            {
                name: 'Side quote',
                element: 'blockquote',
                classes: ['side-quote']
            },
            {
                name: 'Marker',
                element: 'span',
                classes: ['marker']
            },
            {
                name: 'Spoiler',
                element: 'span',
                classes: ['spoiler']
            },
            {
                name: 'Code (dark)',
                element: 'pre',
                classes: ['fancy-code', 'fancy-code-dark']
            },
            {
                name: 'Code (bright)',
                element: 'pre',
                classes: ['fancy-code', 'fancy-code-bright']
            }
        ]
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    },
    previewPlugin: {
        isPreview: false
    }
};


const CKEditorWrapper: React.FC<CKEditorWrapperProps> = ({ data, onChange, onReady, editorProps, containerProps }) => {
    const editorContainerRef = useRef(null);
    const editorRef = useRef<any>(null);


    const handleChange = React.useCallback((event: any, editor: any) => {
        const data = editor.getData();
        onChange(data, editorRef.current.editor);
    }, [onChange]);

    const handleReady = React.useCallback((editor: any) => {
        onReady(editor);
    }, [onReady]);

    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);



    return (
        <Box sx={containerProps}>
            <BoxEditor sx={editorProps} className={'main-container'}>
                <Box
                    className="editor-container editor-container_classic-editor editor-container_include-style"
                    ref={editorContainerRef}
                >
                    <Box className="editor-container__editor">
                        <Box >
                            {isLayoutReady && (
                                <CKEditor
                                    ref={editorRef}
                                    editor={ClassicEditor}
                                    config={editorConfig}
                                    onChange={handleChange}
                                    onReady={handleReady}
                                    // config={{
                                    //     ...editorConfig,
                                    //     toolbar: isPreview ? [] : editorConfig.toolbar,
                                    // }}

                                    data={data}
                                    // onChange={onChange}
                                    // onReady={onReady}
                                />

                            )}
                        </Box>
                    </Box>
                </Box>
            </BoxEditor>
        </Box>
    );
}

export default CKEditorWrapper;


