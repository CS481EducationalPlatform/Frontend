import React, { useState } from "react";
import DocViewer from "react-doc-viewer";

export const DocumentViewer = (
    props:{
        file:null | any
    }
) => {
    const docs = [
        {uri: URL.createObjectURL(props.file)}
    ]
    
    return (
    <>
        <DocViewer documents={docs} />
    </>
    )
}