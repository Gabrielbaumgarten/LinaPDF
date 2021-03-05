import React from 'react'
import './style.css'
import Dropzone from "react-dropzone";
import IconUpload from '../../assets/icon_upload_cloud.svg'

function InputFileArea(props) {
    return(
        <div className='dropzone'>
            {/* Função de Dropzone de arquivos utilizando o react-drop */}
            <Dropzone onDrop={props.onDrop} accept="application/pdf" multiple >
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                <div {...getRootProps()} className="InputFileArea">
                    <div className="label">
                        <input {...getInputProps()} />
                        <img src={IconUpload} alt="upload file" onLoad="SVGInject(this)" />
                    {!isDragActive && ( <p> Arraste e solte os PDFs aqui </p>)}
                    {isDragActive && !isDragReject && ( <p> Por favor, apenas PDF </p>)}
                    </div>
                </div>
            )}
            </Dropzone>
        </div>
    );
}

export default InputFileArea;