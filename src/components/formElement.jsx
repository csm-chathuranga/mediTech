import { useState,useEffect } from 'react';

let Lable = ({name}) => {
    return (
        <>
        <label htmlFor={name} className="d-flex align-items-center fs-13px text-gray-600 pl-3">{name}</label>
        </>
    )
}

let Text = () => {
    return (
        <>
        <label htmlFor="username" className="d-flex align-items-center fs-13px text-gray-600 pl-3">First Name</label>
        </>
    )
}
export {Lable,Text};