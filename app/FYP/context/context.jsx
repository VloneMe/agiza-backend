import React, { createContext, useReducer} from "react";
export const Origincontext = createContext()

export const OrigincontextProvider = (props) => {
const [origin, dispatchOrigin] = useReducer(OriginReducer, {
    latitude: null,
    longitude: null,
    address: "",
    name: "",
})

    return(
        <OrigincontextProvider
            value = {{origin,dispatchOrigin}}
        >
            {props.children}
        </OrigincontextProvider>
    )
}