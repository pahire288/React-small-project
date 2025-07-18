import React from "react";


export const fet = async () =>{

   
        let response = await axios.get("https://jsonplaceholder.typicode.com/posts")

        return await response.json();
    }
    

    function Fetch()
    {
        return(<>
        
        </>);
    }


export default Fetch;