import React, {useState, useEffect} from "react";

const useFetchPost = (url, dataObject)=>{
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [response, setResponse] = useState({});
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                console.log(dataObject);
                let res = await fetch(url, {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                console.log(JSON.stringify(dataObject))
                console.log(res);
                let resJson = await res.json();
                if (res.status === 201) {
                } else {
                    console.log(resJson);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    },[url]);
    return{data, loading};
}

export default useFetchPost;