import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account,database } from "../../Appwrite/AppwriteConfig";
import Navbar from "./Navbar";
import BookCard from "./BookCard";
import config from "../../Appwrite/config";

function Home() {
    const navigate = useNavigate();

    const [userDetails,setUserDetails] = useState();

    const [userBooks,setUserBooks] = useState([]);

    var user="";

    async function getdata(){
        const getData = account.get();
        getData.then(
            function(response){
                setUserDetails(response);
                console.log(response.$id);
                user=response.$id;
            },
            function(error){
                console.log(error);
            }
        );
    }

    async function updateBooks(id){
        const newReview = prompt("Enter new Review : "); 
        const newRating = prompt("Enter new Rating : ");
        const updateData = database.updateDocument(config.ApperiteDatabaseId,config.ApperiteCollectionId,id,{
            review:newReview,
            rating:newRating
        });
        updateData.then(
            function(response){
                console.log(response);
                window.location.reload();
            },
            function(error){
                console.log(error);
            }
        )
    }

    async function getBooks(){
        const getData = database.listDocuments(config.ApperiteDatabaseId,config.ApperiteCollectionId);
        getData.then(
            function(response){
                const book = (response.documents).filter((book)=>book.user_Id === user);
                console.log(book);
                setUserBooks(book);
            },
            function(error){
                console.log(error);
            }
        );
    }

    useEffect(()=>{
        getdata();
        getBooks();
    },[]);


    const deleteBooks = async (id) =>{
        try{
            await database.deleteDocument(config.ApperiteDatabaseId,config.ApperiteCollectionId,id);
            window.location.reload();
        }
        catch(error){
            console.log(error);            
        }
    }

    const handleLogOut = async () =>{
        try{
            await account.deleteSession("current");
            navigate("/");
        }catch(error){
            console.log(error);
        }
    };
   

return (
        <>
            {userDetails ? (
                <>
                    <div className="h-screen w-full">
                        <div >
                            <Navbar user={userDetails} logout={handleLogOut}/>
                        </div>
                        <div className="block w-auto">
                            
                            {userBooks.length?(
                            userBooks.map((book)=>(
                                <BookCard book={book} key={book.collection_Id} delete={deleteBooks} update={updateBooks}/>
                            ))):(
                                <div className="flex justify-center items-center mt-6">
                                    <h1 className="flext justify-center text-2xl font-serif font-bold text-white">No Books Added yet</h1>
                                </div>
                             )}
                        </div>
                    </div>
                </>
            ):(
                <div className="flex justify-center items-center h-screen">
                    <h1 className="flext justify-center align-middle font-serif"><span className="text-2xl font-bold text-orange-600 ">Loading...</span></h1>
                </div>  
            )}
        </>
    )
}

export default Home;