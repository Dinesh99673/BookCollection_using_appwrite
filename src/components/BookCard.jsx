import React from "react";

function BookCard(props){
    return (
            <div className="flex md:flex-row justify-items-center flex-col items-center mt-5 gap-7 md:ml-6 mb-6 ">
               <div className="max-w-[50%] float-left-">
                    <img src={props.book.imageLink} alt={props.book.title} className="hover:animate-pulse max-w-[200px] max-h-[350px]  rounded-lg shadow-2xl shadow-black"/>
                </div>
                <div className="flex flex-col  gap-2 md:max-w-[50%] w-[75%] float-left ">
                    <h1 className="p-1 text-2xl font-semibold text-white "><span className="text-2xl font-bold text-orange-600 ">{(props.book.title).toUpperCase()} </span> - by <span className="text-2xl font-bold text-orange-600 ">{props.book.author} </span></h1>
                    <h2 className="text-md text-gray-400">Date Read : {(props.book.readDate).slice(0,10)}</h2>
                    <h1 className="text-md font-semibold text-white"><span className="text-lg font-bold text-orange-700 ">How strongly I recommend it : </span>{props.book.rating}/10</h1>
                    <h1 className="text-md font-semibold text-white "><span className="text-lg font-bold text-orange-700 ">Review : </span>{props.book.review}</h1>
                    <div className="flex gap-3 mt-3">
                        <button className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-full" onClick={()=>props.update(props.book.$id)} >Update</button>
                        <button className="bg-red-700 hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-full" onClick={()=>props.delete(props.book.$id)}>Delete</button>
                    </div>
                </div>
           </div>
    );
}

export default BookCard;