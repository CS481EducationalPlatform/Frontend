import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import UploadIcon from '@mui/icons-material/Upload';
import { SvgIcon } from '@mui/material';

//allow only certain extensions
const fileTypes = ["txt", "docx", "pdf"];

function DragDrop({ onFileUploaded }: { onFileUploaded: (file: any) => void }) {

  const [file, setFile] = useState(null);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(<></>);

  //Can be used as onDrop or onSelect as well, handleChange does both D&D and Upload
  const handleChange = (file) => {
    setHasUploaded(true);
    setErrorMessage(<></>)
    setFile(file);
    onFileUploaded(file);
    console.log(file);
  };

  const handleBadSize = () => {
    setHasUploaded(false);
    setErrorMessage(<p>File size limited<br/>to 25 MB</p>);
  }

  const handleBadType = () => {
    setHasUploaded(false);
    setErrorMessage(<p>File types limited<br/>to {fileTypes.join(', ')}</p>);
  }

  return (
    <>
      <FileUploader 
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          maxSize={25}
          hoverTitle=" "
          onSizeError={handleBadSize}
          onTypeError={handleBadType}
      >
          <div style={{height:200 , width:200, border: '2px solid ' + (hasUploaded ? 'green' : 'red'), display:'flex', justifyContent:'center', alignItems:'center', borderRadius:25}}>
              <SvgIcon component={UploadIcon} style={{position:'relative', top: 0, left: 0, width: '100%', height: '100%', color:(hasUploaded ? 'green' : 'red'), opacity:'20%'}} />
              <div style={{position:'absolute', textWrap:'nowrap', width:200, overflow:'hidden', display:(hasUploaded ? 'flex' : 'grid'), justifyContent:'center', alignItems:'center'}}>
                  {hasUploaded 
                  ? <p style={{width: '90%', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}}>Upload of<br/>{file ? file["name"] : <></>}<br/>Successful<br/><u style={{cursor: 'pointer'}}>Upload</u> Another?</p> 
                  : <p><u style={{cursor: 'pointer'}}>Click Here</u><br/>or<br/>Drag & Drop<br/>File to Upload</p>
                  }
                  {errorMessage}
              </div>
          </div>
      </FileUploader>
    </>
  );
}

export default DragDrop;