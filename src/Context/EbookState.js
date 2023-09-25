import EbookContext from "./ebookContext";

const EbookState = (props)=>{
    const state = {
        // "name": "Ashmit"
    }
    return(
        <EbookContext.Provider value = {state}>
            {props.children}
        </EbookContext.Provider>
    )
}

export default EbookState;