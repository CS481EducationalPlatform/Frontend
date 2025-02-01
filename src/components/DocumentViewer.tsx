import React, {useState} from 'react';
import Mammoth from "mammoth";

const DocumentViewer = ({ file }: { file: any }) => {
    const [content, setContent] = useState<string>("");
    
    const handleDocx = () => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            if (event.target?.result) {
                const arrayBuffer = event.target.result as ArrayBuffer;
                const result = await Mammoth.convertToHtml({ arrayBuffer });
                setContent(result.value);
            }
        };
        reader.readAsArrayBuffer(file);

        return (
            <div style={{width:500, height:500, border: '1px solid red', overflow:'scroll'}} dangerouslySetInnerHTML={{__html: content}}></div>
        )
    };

    return (
    <>
        <div>
            {
            file && file["type"] == 'application/pdf' 
            ? <iframe style={{width:500, height:500}} src={URL.createObjectURL(file)}></iframe>
            : <></>
            }
            {
            file && file["type"].includes("openxml")
            ? handleDocx()
            : <></>
            }
        </div>
    </>
    );
};

export default DocumentViewer;