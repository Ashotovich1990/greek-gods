import React from 'react'; 

const Error = (props) => {
    debugger
    return (
        <div className="erros">
            {props.error.message}
        </div>
    )
}

export default Error;