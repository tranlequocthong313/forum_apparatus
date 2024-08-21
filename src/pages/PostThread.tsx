import React, {useEffect, useState} from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Card, CardActions, CardContent,
    Chip,
    Paper,
    Snackbar,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import CKEditorWrapper from '../components/ckeditor/CKEditorWrapper';
import {styled} from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import CKContent from "../components/ckeditor/CKContent";

interface TagsInputProps {
    value: string[];
    onChange: (newTags: string[]) => void;
}

const StyledPaper = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.background.default,
}));
const TagsInput: React.FC<TagsInputProps> = ({value, onChange}) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (inputValue.length >= 3) {
                setLoading(true);
                try {
                    const response = await axios.get(`https://your-api-url.com/tags?search=${inputValue}`);
                    setSuggestions(response.data);
                } catch (error) {
                    console.error('Error fetching tags:', error);
                    setSuggestions([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
        return () => clearTimeout(timeoutId);
    }, [inputValue]);

    const handleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
        setInputValue(newInputValue);
    };

    const isOptionEqualToValue = (option: string, value: string) => {
        return option !== 'loading' && option !== 'placeholder' && option === value;
    };
    const handleTagAdd = (event: React.SyntheticEvent, newValue: string | string[]) => {
        if (typeof newValue === 'string') {
            if (newValue && !value.includes(newValue) && newValue.length >= 3) {
                onChange([...value, newValue]);
            }
        } else {
            onChange(newValue);
        }
        setInputValue('');
    };

    const getOptionLabel = (option: string) => {
        if (option === 'loading') return 'Loading...';
        if (option === 'placeholder') return `Please enter ${3 - inputValue.length} more character${3 - inputValue.length === 1 ? '' : 's'}.`;
        return option;
    };

    const filterOptions = (options: string[], state: { inputValue: string }) => {
        if (state.inputValue.length < 3) {
            return ['placeholder'];
        }
        if (loading) {
            return ['Loading...'];
        }
        return options.length > 0 ? options : [state.inputValue];
    }

    const handleTagDelete = (tagToDelete: string) => {
        onChange(value.filter((tag: string) => tag !== tagToDelete));
    };
    return (
        <Box>
            <Autocomplete
                multiple
                id="tags-filled"
                options={suggestions}
                freeSolo
                value={value}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                // onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                onChange={handleTagAdd}
                // onChange={(event, newValue) => onChange(newValue as string[])}
                renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => {
                        const {key, ...tagProps} = getTagProps({index});
                        return (
                            <Chip
                                variant="outlined"
                                label={option}
                                key={key}
                                {...tagProps}
                                onDelete={() => handleTagDelete(option)}
                            />
                        )
                    })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label=""
                        variant="outlined"
                        placeholder="Enter tags"
                        fullWidth
                    />
                )}
                getOptionLabel={getOptionLabel}
                filterOptions={filterOptions}
                noOptionsText="No matching tags"
                isOptionEqualToValue={isOptionEqualToValue}
                renderOption={(props, option) => {
                    if (option === 'loading' || option === 'placeholder') {
                        return <li {...props} style={{pointerEvents: 'none'}}>{getOptionLabel(option)}</li>;
                    }
                    return <li {...props}>{option}</li>;
                }}
                PaperComponent={StyledPaper}
            />
        </Box>
    );
}

const BottomContainer = styled(Box)(({theme}) => ({
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    zIndex: 1,
    display: 'flex'
}))

interface PostButtonProps {
    onClick: () => void;
    isSubmitting: boolean;
}

const PostButton: React.FC<PostButtonProps> = ({onClick, isSubmitting}) => {
    return (
        <BottomContainer>
            <LoadingButton
                color="primary"
                loading={isSubmitting}
                variant="contained"
                type={'submit'}
                sx={{ml: 'auto', mr: 'auto'}}
            >
                <Typography variant={'button'}>
                    {isSubmitting ? 'Posting...' : 'Post thread'}
                </Typography>
            </LoadingButton>
        </BottomContainer>
        // <Button variant="contained" color="primary" onClick={onClick} sx={{mt: 2}}>
        //     Post thread
        // </Button>
    );
};

interface PostData {
    content: string;
    title: string;
    forumCategory: string,
    tags: string[]
}

interface ValidationErrors {
    content?: string;
    title?: string;
}

const PostThread: React.FC = () => {
    const [postData, setPostData] = useState<PostData>({
        title: '',
        content: '',
        forumCategory: '',
        tags: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'success' as 'success' | 'error'})
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [availableTags, setAvailableTags] = useState<string[]>([]);
    const [editor, setEditor] = useState<any>(null);


    // useEffect(() => {
    //     if (errors.content) {
    //         setSnackbar({open: true, message: errors.content, severity: 'error'})
    //     }
    //
    // }, [errors])

    const handlePost = () => {
        // console.log({title, content, tags});
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setPostData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prevErrors => ({...prevErrors, [name]: undefined}));
        }
    }

    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        setPostData(prevState => ({
            ...prevState,
            content: data
        }));

        if (errors.content) {
            setErrors(prevErrors => ({...prevErrors, content: undefined}));
        }
    }


    const handleTagsChange = (value: string[]) => {
        setPostData(prevState => ({
            ...prevState,
            tags: value
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};
        if (postData.title.trim().length < 5) {
            newErrors.title = 'Tiêu đề phải có ít nhất 5 ký tự';
        }
        // const title = editor.plugins.get('Title').getTitle();
        // if (!title || title.trim().length < 5) {
        //     newErrors.content = 'Tiêu đề phải có ít nhất 5 ký tự';
        // }
        if (postData.content.trim().length < 100) {
            newErrors.content = 'Nội dung phải có ít nhất 100 ký tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

    }

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({...prev, open: false}))
    };

    return (
        <>
            <Card sx={{overflow: 'unset'}}>
                <CardContent>

                    <Box component='form' onSubmit={handleSubmit} sx={{margin: 'auto', p: 2}}>
                        {/*<ThreadTitleInput value={title} onChange={setTitle} />*/}

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Type your title"
                            name='title'
                            value={postData.title}
                            onChange={handleInputChange}
                            error={!!errors.title}
                            helperText={errors.title}
                            required
                        />


                        <CKEditorWrapper
                            data={postData.content}
                            onChange={handleEditorChange}
                            onReady={(editor: any) => {
                                setEditor(editor);
                            }}
                        />
                        {errors.content &&
                            <Box sx={{color: 'error.main', fontSize: '0.75rem', mt: 0.5}}>{errors.content}</Box>}

                        {/*<TagInput tags={tags} onTagsChange={setTags}/>*/}
                        {/*<Box sx={{my: 2}}>*/}
                        {/*    <TagsInput*/}
                        {/*        value={postData.tags}*/}
                        {/*        onChange={handleTagsChange}*/}
                        {/*    />*/}
                        {/*</Box>*/}
                        {/*<CardActions>*/}

                        <PostButton onClick={handlePost} isSubmitting={false}/>
                        {/*</CardActions>*/}
                    </Box>
                </CardContent>

            </Card>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{width: '100%'}}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default PostThread;
