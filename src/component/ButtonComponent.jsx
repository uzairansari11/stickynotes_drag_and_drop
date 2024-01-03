import React from 'react'

const ButtonComponent = ({name,handler,backgroundColor,color,border}) => {
  return (
    <button onClick={handler}
    
    style={{
        backgroundColor: backgroundColor||'white',
        color: color||'black',
        border: border||'1px solid black',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px',
        cursor: 'pointer'
    }}
    
    >{name}</button>
  )
}

export default ButtonComponent