import React from "react";
import {Box} from "@mui/material";
import DOMPurify from 'dompurify';

interface CKContentProps {
    content: string;
}

const CKContent: React.FC<CKContentProps> = ({content}) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return (
        <Box
            dangerouslySetInnerHTML={{__html: sanitizedContent}}
            className={'ck-content'}
        >
        </Box>
    )
}

export default CKContent;