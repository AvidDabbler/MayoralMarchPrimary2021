import React from 'react'

export default function Buttons() {
    return (
        <div id='buttons' className='absolute'>
            <a href="https://www.walterkjenkins.com/" target='blank' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-3">
                About Walter
            </a>
            <a href="https://secure.actblue.com/donate/fliptheboardstl" target='blank' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-3">
                Donate!
            </a>
        </div>
    )
}
