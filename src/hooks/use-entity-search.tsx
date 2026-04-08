
// ! DeBounce Hooks for searching workflows from the server
// ? Never search using repatative request usedebounce hook

import { PAGINATION } from "@/config/constants";
import { useEffect, useState, useRef } from "react";

export function useEntitySearch (
    params : any,
    setParams : any,
    debounceMs = 500
) {
    const [localsearch , setLocalSearch] = useState(params.search || '');
    const paramsRef = useRef(params);

    // ? Keep params ref up to date
    useEffect(() => {
        paramsRef.current = params;
    }, [params]);

    // ? Debounce search and update params
    useEffect(()=> {
        const timer = setTimeout(()=>{
            if(localsearch !== paramsRef.current.search){
                setParams({
                    ...paramsRef.current,
                    search: localsearch,
                    page: PAGINATION.DEFAULT_PAGE
                })
            }
        },debounceMs)
    
        return () => clearTimeout(timer)

    },[localsearch, debounceMs, setParams])

    // ? Sync local search with params.search when it changes externally
    useEffect(()=>{
        setLocalSearch(params.search || '')
    },[params.search])

    return {
        searchValue: localsearch,
        onSearchChange: setLocalSearch
    }
}
