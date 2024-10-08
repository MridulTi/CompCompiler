"use client"
const { createContext, useState, useContext } = require("react");

const AppContext=createContext(null);

export function AppProvider({children}) {
    const [AuthPage,setAuthPage]=useState("login");
    const [userCred,setUserCred]=useState(undefined)
    const [propertyData, setProperty] = useState(null);
    const [searchList,setSearchList]=useState(null);
    const [output,setOutput]=useState(null);
    const [dark,setDark]=useState(false);

    function handleSearchList(data){
        setSearchList(data)
        console.log(data)
    }
    function toggleAuthPage(data){
        setAuthPage(data)
    }

    function funcSetProperty(data){
        setProperty(data)
    }

    function setupUserCred(data){
        setUserCred(data)
    }
    function setRecentOutput(data){
        setOutput(data)
    }
    function setAllDark(data){
        setDark(data)
    }


    return(
        <AppContext.Provider value={{
            AuthPage,
            toggleAuthPage,
            propertyData,
            funcSetProperty,
            searchList,
            handleSearchList,
            userCred,
            setupUserCred,
            output,
            setRecentOutput,
            dark,
            setAllDark
            }}>
           {children}
        </AppContext.Provider>
    )
}
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useActions must be used within an ActionsProvider");
    }
    return context;
};

