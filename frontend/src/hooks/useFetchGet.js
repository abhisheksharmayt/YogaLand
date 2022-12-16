import React, { useState, useEffect } from 'react'

const useFetchGet = (url, dependency1=true, dependency2=true) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    // console.log(url);
    useEffect(() => {
        const dataFetch = async () => {
            try {
                const resp = await fetch(url,
                    {
                        method: 'GET',
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