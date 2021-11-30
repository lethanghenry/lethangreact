
import React from 'react'

export default function Menu() {
    return (
        <div className="justify-content-center m-3 ">
            <ul>
                <li  >
                    <a href="/"><img src="https://luxen.vn/media/images/icondm.png" width="30px" /><span className="px-2">List</span></a>
                </li>
                <li className="mt-3">
                    <a href="/New"><img src="https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png" width="30px" /><span className="px-2">New</span></a>
                </li>
            </ul>
        </div>
    )
}
