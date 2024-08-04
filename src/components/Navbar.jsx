import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
    const navigate = useNavigate();
    return(
        <div className="relative w-full h-20 flex justify-center items-center ">
            <div className="absolute mt-0 overflow-auto w-[80%] h-11 bg-black text-white flex justify-between items-center mx-auto rounded-xl">
                <h1 className="md:text-2xl text-lg font-bold ml-2 text-white "> 
                    <span className="md:visible invisible md:text-2xl text-[1px]">Book Collection of </span>
                    <span className="text-[#bf3900]">{props.user.name}</span>
                </h1>
                <div className="flex justify-right gap-3">
                    <button className="mr-2 text-[#28adaa] md:text-lg text-md" onClick={()=>(navigate("/addBook"))}>Add Book</button>
                    <button className="mr-2 text-[#28adaa] md:text-lg text-md" onClick={()=>(props.logout())}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;