import { useEffect, useState } from "react";

export default function useJson(path:string) {
    const [json,setJson] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>();

    useEffect(()=>{
        setLoading(true);
        (async ()=>{
            try {
                const res = await fetch(`https://raw.githubusercontent.com/jChenvan/portfolio-site-data/main/${path}`);
                setJson(await res.json());
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        })()
    },[]);

    return {json, loading, error}
}