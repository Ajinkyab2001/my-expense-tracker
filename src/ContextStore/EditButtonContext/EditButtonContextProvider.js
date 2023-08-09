import React, { useState} from 'react'
import EditButtonContext from './EditButtonContext'

function EditButtonContextProvider(props) {
    const [valuesObj, setValuesObj] = useState({});

    

    return (
        <EditButtonContext.Provider value={{valuesObj, setValuesObj}}>{props.children}</EditButtonContext.Provider>
    )
}

export default EditButtonContextProvider