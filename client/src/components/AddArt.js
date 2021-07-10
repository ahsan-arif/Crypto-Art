import React, {useState} from 'react'
import Resizer from "react-image-file-resizer";
import history from '../history';
export const AddArt = ( {readyArtForUpload} ) => {

    const[name, setName] = useState('');
    const[description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [selectedFile, setSelectedFile] = useState('');

    const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });

    const onSubmit = (image) =>{
        //alert(text + ' '+amount);
       // addExpense(text, amount);
       if(name === ''){
           alert("Please specify name for your artwork")
       }else if(amount === 0 || amount <0){
        alert("Amount should be greater than 0")
       }else if(selectedFile === ''){
           alert('Please select your artwork')
       }
       else{
         console.log("in else")
           const reader = new window.FileReader()
           reader.readAsArrayBuffer(image)
           reader.onloadend = ()=>{
               const bufferArray  =Buffer(reader.result)
               //console.log(res)

              // console.log(name +" "+amount+" "+description)
               readyArtForUpload(name,amount,bufferArray,description)
           }
           //alert(selectedFile.name)
       }
        
      }
    const clearForm = ()=>{
      setName('')
      setDescription('')
      setAmount('')
      setSelectedFile('')
      history.push('/')
    }
      const compressImage = async(e)=>{
        e.preventDefault()
       // console.log(name +" "+amount)
        try {
          const file = selectedFile;
          if(file === ''){
            alert('Please select a file')
            console.log(file)
          }else{
            const image = await resizeFile(file);
            onSubmit(image)
          }
         
         // console.log(selectedFile,'-----')
        
         // console.log(image);
        } catch (err) {
          console.log(err);
        }
      }
    return (
        <div className = "container">
            <h3>Add New Artwork</h3>

            <form onSubmit= {compressImage} >
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text"  value={name} onChange={(e)=> setName(e.target.value)}
          placeholder="Enter name..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >ETH Price <br />
            {/* (negative - expense, positive - income) */}
            </label
          >
          <input type="number"  value={amount} onChange={(e)=> setAmount(e.target.value)}
          placeholder="Enter amount..." />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input type="text"  value={description} onChange={(e)=> setDescription(e.target.value)}
          placeholder="Enter description..." />
        </div>
        <div className="form-control">
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        </div>
        <button className="btn" >Share</button>
        <button className="btn" onClick={clearForm} >Cancel</button>
        </form>
        </div>
    )
}
