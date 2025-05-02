import React, { Children } from 'react'
import { Button } from 'react-bootstrap'

const CustomButton = ({typeName,classSelection,children,isdisable = false}) => {
  return (
    <Button type={typeName} className={classSelection} disabled= {isdisable}> 
        {children}
    </Button>
)}

export default CustomButton