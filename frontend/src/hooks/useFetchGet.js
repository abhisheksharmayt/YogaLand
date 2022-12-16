import React, { useState, useEffect } from 'react'
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/api';
const header = new Headers({ "Access-Control-Allow-Origin": "*" });

const useFetchGet = (url, dependency1=true, dependency2=true) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    // console.log(url);
    useEffect(() => {
        const dataFetch = async () => {
            try {
                console.log(url);
                const resp = await fetch(`${url}`,
                    {
                        method: 'GET',
                        withCredentials: true,
                        header: header,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                    });
                const data = await resp.json();
                setData(data);
                setLoading(false);
                // console.log(resp);
                // console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        dataFetch();
    }, [url, dependency1, dependency2]);
    return { data, loading };
}

export default useFetchGet;