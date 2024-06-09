// import React, { createContext, useReducer} from "react";
// import { OriginReducer, DestinationReducer } from "../reducers/reducers";


// // Initial state for origin and destination
// const initialOriginState = {
//     latitude: 0,
//     longitude: 0,
//   };
  
//   const initialDestinationState = {
//     latitude: 0,
//     longitude: 0,
//   };

// export const Origincontext = createContext()
// export const DestinationContext = createContext()

// // Context Providers
// export const OrigincontextProvider = ({ children }) => {
//     const [origin, dispatchOrigin] = useReducer(OriginReducer, initialOriginState);
//     return (
//       <Origincontext.Provider value={{ origin, dispatchOrigin }}>
//         {children}
//       </Origincontext.Provider>
//     );
//   };
  
//   export const DestinationProvider = ({ children }) => {
//     const [destination, dispatchDestination] = useReducer(DestinationReducer, initialDestinationState);
//     return (
//       <DestinationContext.Provider value={{ destination, dispatchDestination }}>
//         {children}
//       </DestinationContext.Provider>
//     );
//   };



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

export const DestinationContextProvider = (props) => {
    const [destination, dispatchDestination] = useReducer(DestinationReducer, {
        latitude: null,
        longitude: null,
        address: "",
        name: "",
    })
    
        return(
            <DestinationContextProvider
                value = {{destination,dispatchDestination}}
            >
                {props.children}
            </DestinationContextProvider>
        )
    }