import React from 'react'
import './style.css'

import Menu from '../Menu/'
import LinaPDFLogo from '../../assets/LinaPDF.png'
import {Link} from 'react-router-dom'

const NavBar = ()=>{
    return(
        <div className='nav-bar'>
            <div className='nav-block'>
                <div className="logo">
                    <Link to='/'>
                        <img src={LinaPDFLogo} alt="Lina PDF"/>
                    </Link>
                </div>

                <ul>
                    <li><Link to='/JuntarPDF' className='nav-button'>Juntar PDF</Link></li>
                    <li><Link to='/DividirPDF' className='nav-button'>Dividir PDF</Link></li>
                    <li><Link to='/ComprimirPDF' className='nav-button'>Comprimir PDF</Link></li>
                    <li><Link to='/PesquisarPDF' className='nav-button'>Pesquisar no PDF</Link></li>
                </ul>
            </div>
            <Menu/>
        </div>
    )
}

export default NavBar;