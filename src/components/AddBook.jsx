import React from "react";
import { account, database} from "../../Appwrite/AppwriteConfig";
import {v4 as uuid} from "uuid";
import { useNavigate } from "react-router-dom";
import config from "../../Appwrite/config";

function AddBook(){

    const navigate = useNavigate();

    const [flag,setFlag] = React.useState(false);

    const [userDetail,setUserDetails] = React.useState();

    const [newBook,setNewBook] = React.useState({
        title:"",
        author:"",
        review:"",
        rating:"",
        coverLink:"",
        date:new Date().toLocaleDateString()
    })

    React.useEffect(()=>{
        const getData = account.get();
        getData.then(
            function(response){
                setUserDetails(response);
            },
            function(error){
                console.log(error);
            }
        );
    
    },[]);

    const handleClick =async (e) => {
        e.preventDefault();

        var author_name="";
        var coverLink="";

        try{
    
            var i=0;
            var status=false;
            while(i<4 && !status){
                try{
                    await fetch('https://openlibrary.org/search.json?q='+newBook.title+'&fields=title,cover_i,author_name&limit=1&offset=0')
                    .then(res => res.json())
                    .then(jsonData => {
                        status=jsonData.docs[0].hasOwnProperty('cover_i');
                        author_name=jsonData.docs[0].author_name[0];
                        coverLink=('https://covers.openlibrary.org/b/id/'+jsonData.docs[0].cover_i+'-M.jpg');
                    });
                }
                catch(error){
                    console.log(error);
                    status=false;
                    break;
                }
            }
            if(status){

                const promise = database.createDocument(config.ApperiteDatabaseId,config.ApperiteCollectionId,uuid(),{
                    collection_Id:uuid(),
                    user_Id:userDetail.$id,
                    title:newBook.title,
                    author:author_name,
                    readDate:newBook.date,
                    imageLink:coverLink,
                    rating:newBook.rating,
                    review:newBook.review
                });
                promise.then(
                    function(response){
                        console.log(response);
                    },function(error){
                        console.log(error);
                    }
                );
                navigate("/home");
            }
            else{
                setFlag(true);
            }
            setNewBook({
                title:"",
                author:"",
                review:"",
                rating:"",
                coverLink:"",
                date:new Date().toLocaleDateString()
            });
        }
        catch(error){
            console.log(error);
        }

    }

    return(
        <>
            <div className='h-screen w-full'>
                <div className='align-middle flex flex-col justify-center items-center h-full'>
                    <div className='w-[60%] h-[45%] md:w-[35%] md:h-[50%] overflow-hidden'>
                        <div className='border-2 border-black p-3 rounded-xl h-full bg-transperent shadow-2xl relative'>
                                <h1 className='flex justify-center font-serif text-2xl font-bold'>Add New Book</h1>
                                <p className="text-red-700 text-center mt-2 font-serif">{flag && "Entered book Title doesn't Exist in Database"}</p>
                                <div className='flex flex-col justify-center items-center mt-3'>
                                    <input 
                                        type="text" 
                                        placeholder='Title' 
                                        value={newBook.title}
                                        onChange={(e)=>setNewBook({...newBook,title:(e.target.value).toLowerCase()})}
                                        className='w-[80%] h-8 border-2 rounded-md outline-0 border-[#5C469C] p-2 mt-3' 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder='Review' 
                                        value={newBook.review}
                                        onChange={(e)=>setNewBook({...newBook,review:e.target.value})}
                                        className='w-[80%] h-8 border-2 rounded-md outline-0 border-[#5C469C] p-2 mt-3' 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder='Rating ?/10' 
                                        value={newBook.rating}
                                        onChange={(e)=>setNewBook({...newBook,rating:e.target.value})}
                                        className='w-[80%] h-8 border-2 rounded-md outline-0 border-[#5C469C] p-2 mt-3' 
                                    />
                                </div>
                                <div className='flex flex-row justify-between items-center mt-3 w-[80%] mx-auto'>
                                    <button 
                                        className='mt-3 p-2 w-[40%] border-white bg-[#5C469C] rounded-lg text-white  font-bold hover:bg-[#896ce0] font-serif text-sm md:text-md'
                                        onClick={()=>(navigate("/home"))}    
                                    >
                                        Home
                                    </button>

                                    <button 
                                        className='mt-3 p-2 w-[40%] border-white bg-[#5C469C] rounded-lg text-white  font-bold hover:bg-[#896ce0] font-serif text-sm md:text-md'
                                        onClick={handleClick}    
                                    >
                                        Submit
                                    </button>
                                </div>                                
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddBook;