import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook ,deletBook,updateBooks} from './redux/BookSlice';

const Books = () => {
    const theBooks=useSelector((state)=>state.books.items)
    const [title,setTitle]=useState('');
    const [author,setAuthor]=useState('');
    const [desc,setDesc]=useState('');
    const[isEdit,setIsEdit]=useState(false);
    const [id,setId]=useState(null);
    const[updatedTitle,setUpdatedTitle]=useState('');
    const[updatedAuthor,setUpdatedAuthor]=useState('');
    const[updatedDesc,setUpdatedDesc]=useState('');
   const dispatch=useDispatch();

    return (
        <div>
  <form className='container ' onSubmit={(e) => {
    e.preventDefault();
}}>
    <h1>App crud using redux tollkit</h1>
    <div className='mainForm'>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Book title</label>
    <input onChange={(e)=>setTitle(e.target.value)} type="text" className="form-control"
    value={title} id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Auther name</label>
    <input value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="form-floating" style={{marginBottom:"20px"}}>
  <textarea  value={desc}onChange={(e)=>setDesc(e.target.value)} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
  <label htmlFor="floatingTextarea">Book description</label>
</div>
  <button 
  onClick={
    ()=>{
    dispatch(addBook({id:theBooks.length +1,title,author,desc}))
    setTitle("")
    setAuthor("")
    setDesc("")
  }}
  key={theBooks.id} className="btn btn-outline-success" >Submit</button>
  </div>
</form>

<div className='books container' style={{textAlign:"center",direction: "ltr"}}>
{theBooks.length>0 ? theBooks.map(e=>
        <div key={e.id} className='book' >
        <h2 style={{direction: "ltr"}}>Book title: {e.title}</h2>
        <h3> Author name : {e.author}</h3>
        <p>About the book : {e.desc}</p>
        <br/>
        <button className='btn btn-outline-primary' onClick={()=>{
            setIsEdit(true);
            setId(e.id);
        }}>Edit <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button className='btn btn-outline-danger' onClick={()=>
            dispatch(deletBook({id:e.id}))}>
           Delete <i class="fa-solid fa-trash-can"></i>
        </button>
        <br/>
        {
            isEdit && id === e.id && (
                <div className='addedBooks'
                 style={{textAlign:"center",marginTop:"10px",width:"550px",margin:"auto"}}>
                    <div style={{width:"100%",marginBottom:"8px"}}>
                <input className='form-control '  type="text" placeholder='edit title'
                onChange={(e)=>setUpdatedTitle(e.target.value)}/>
                </div>
                <div style={{width:"100%",marginBottom:"8px"}}>
                <input className='form-control' type="text" placeholder='edit author'
                 onChange={(e)=>setUpdatedAuthor(e.target.value)}/>
                 </div>
                 <div style={{width:"100%",marginBottom:"8px"}}>
                <textarea className='form-control' placeholder='edit desc'
                 onChange={(e)=>setUpdatedDesc(e.target.value)}/>
                 </div>
                <button className="btn btn-outline-primary" onClick={()=>
                    dispatch(updateBooks({id:e.id,title:updatedTitle,author:updatedAuthor,desc:updatedDesc,}, setIsEdit(false)))
                   
                    

}>Update</button>
                </div>
            )
        }

    </div>):<div className='noBooks' style={{textAlign:"center",marginTop:"20px"}}>there is no books</div> 
}
</div>

        </div>
    );
}

export default Books;
