import React from 'react';
import './style.css';
import AddIcon from '@material-ui/icons/Add';
import  Fab  from '@material-ui/core/Fab';

function BotaoFluanteAdd(props) {
    return (
        <Fab size='medium' className='float-button-add'>
              <label htmlFor='file01' className='IconAdd'>
                <AddIcon />
              </label>
              <input id="file01" type="file" accept='application/pdf' ref={props.arquivosAdicionados} onChange={props.adicionarArquivos} multiple/>
        </Fab>
    );
}

export default BotaoFluanteAdd;