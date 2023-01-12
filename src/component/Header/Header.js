import { Button } from '@mui/material'
import React from 'react'

const Header = ({handleReset}) => {
  let urlList=window.location.href.split('/')
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingLeft:"20px",paddingRight:"20px",boxShadow:"1px 2px 5px #8185EA"}}>
        <h2>GEEKTRUST</h2>
        {urlList[3]!=="result" && <Button onClick={handleReset} variant="contained">RESET</Button>}
    </div>
  )
}

export default Header