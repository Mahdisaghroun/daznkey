import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function SignInPage() {
    function copy(str) {
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = str;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = { position: 'absolute', left: '-9999px' };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);

    }
    const [data, setdata] = useState()
    const [LINK, setLINK] = useState()
    const getkey = () => {

        var data = JSON.stringify({
            "link": LINK
        });

        var config = {
            method: 'post',
            url: 'http://45.86.191.43/5100/api/license',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                let d = JSON.stringify(response.data);
                d = d.split(':')[2]
                d = d.replace('"', "")
                d = d.replace(']', '')
                setdata(d)
            })
            .catch(function (error) {
                setdata(JSON.stringify(error.response.data))
                console.log(error);
            });

    }
    return (
        <div className="text-center m-5-auto">
            <h2>DAZN KEY by ZeroBug 🇹🇳</h2>
            <form >
                <p>
                    <label>Paste here the link copied from DAZN HELPER</label><br />
                    <textarea
                        onChange={(e) => setLINK(e.target.value)}
                        type="text" name="first_name" required style={{
                            width: 500
                        }} />
                </p>

                <p>
                    <button id="sub_btn" type="button" onClick={getkey}>Get key</button>
                </p>
                {data && <div className="text-center">
                <p>{data}</p>
                <p>
                    <button className="text-center btn btn-success " style={{
                        backgroundColor:"green"
                    }} id="sub_btn" type="button" onClick={()=>copy(data)}>copy</button>
                </p></div>}
            </form>
            
        </div>
    )
}
