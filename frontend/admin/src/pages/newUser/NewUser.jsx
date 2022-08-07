import { useState } from "react";
import "./newUser.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewUser() {

  const [inputs,setInputs]=useState({})
  const [file,setFile]=useState(null);

  const dispatch=useDispatch();

  const handleInputs=(e)=>{
    setInputs(prev=>{
      return{...prev,[e.target.name]:e.target.value}
    })
  }
  const handleClick=(e)=>{
    e.preventDefault();
    const fileName = new Date().getTime() + " " + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          const user = { ...inputs, img: downloadURL };
          addUser(user, dispatch);
        });
      }
    );
  }
  console.log(inputs)
  console.log(file)
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
      <div className="newUserItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={e=>setFile(e.target.files[0])}
          />
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" name="username" placeholder="john" onChange={handleInputs} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" name="fullname" placeholder="John Smith" onChange={handleInputs}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" name="email" placeholder="john@gmail.com" onChange={handleInputs}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" name="phone" placeholder="+1 123 456 78" onChange={handleInputs}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" name="address" placeholder="New York | USA" onChange={handleInputs} />
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active" onChange={handleInputs}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}