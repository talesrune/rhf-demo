import React, { useState, ChangeEvent, MouseEvent } from 'react';
import {
    Typography,
    Button,
    Stepper,
    Step,
    StepLabel,
    Grid,
    Paper,
    Stack
  } from "@mui/material";

interface someProps{
  getValues: any
  setValue: any
}
const UploadJson: React.FC<someProps> = ({getValues,setValue}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [jsonData, setJsonData] = useState<any>(null); // Use a more specific type if you know the structure of your JSON data.
  
    const [isEditing, setIsEditing] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setSelectedFile(file || null);
  
      if (file) {
        // Read the contents of the uploaded file
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const json = JSON.parse(event.target?.result as string);
            setJsonData(json);
            setValue('reportInfo', json)
            
          } catch (error) {
            console.error('Error parsing JSON:', error);
            setJsonData(null);
          }
        };
        reader.readAsText(file);
      }
    };

    const handleDoubleClick = (e: MouseEvent<HTMLPreElement>) => {
        setIsEditing(true);
      };
    
      const handleBlur = () => {
        setIsEditing(false);
      };
    
      const handleJsonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        try {
          const editedJson = JSON.parse(e.target.value);
          setJsonData(editedJson);
        } catch (error) {
          console.error('Error parsing edited JSON:', error);
        }
      };
  
    const strfied_data = JSON.stringify(jsonData, null, 2)
    const new_style:any = { overflowY: 'auto', maxHeight:'300px', border: '1px solid #ccc', fontSize: '16px'}
    return (
      <Stack>
        <input type="file" accept=".json" onChange={handleFileChange} />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
        {jsonData && (
          <Grid style={{ textAlign: 'left', width:'150%' }}>
            <h2>JSON Data:</h2>
            {isEditing ? (
            <textarea
              rows={30}
              cols={50}
              value={strfied_data}
              onChange={handleJsonChange}
              onBlur={handleBlur}
            />
            ) : (
                <pre style={new_style} onDoubleClick={handleDoubleClick}>{strfied_data}</pre>
            )}
            {/* <pre style={new_style}>{strfied_data}</pre> */}
          </Grid>
        )}
      </Stack>
    );
  }

export default UploadJson;
