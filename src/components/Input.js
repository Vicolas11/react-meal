import React from "react"

const Input = React.forwardRef((props, ref) => {

    return <input ref={ref} {...props.input} />
})

export default React.memo(Input)