import React, { use } from 'react'
import './styles.css'

function Input({ state, setState, placeholder, label,type,className }) {
    return (
        <div className='input-wrapper'>
            <label className='label-input'>{label}</label>
            <input type={type} className={`custom-input ${className}`} placeholder={placeholder} value={state} onChange={(e) => setState(e.target.value)} />
        </div>
    )
}

export default Input