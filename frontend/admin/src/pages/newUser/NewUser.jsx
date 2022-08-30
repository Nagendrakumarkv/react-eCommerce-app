// import { useState } from "react";
// import "./newUser.css";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import app from "../../firebase";
// import { addUser } from "../../redux/apiCalls";
// import { useDispatch } from "react-redux";

// export default function NewUser() {
//   const [inputs, setInputs] = useState({});
//   const [file, setFile] = useState(null);

//   const dispatch = useDispatch();

//   const handleInputs = (e) => {
//     setInputs((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };
//   const handleClick = (e) => {
//     e.preventDefault();
//     const fileName = new Date().getTime() + " " + file.name;
//     const storage = getStorage(app);
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     // Register three observers:
//     // 1. 'state_changed' observer, called any time the state changes
//     // 2. Error observer, called on failure
//     // 3. Completion observer, called on successful completion
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Observe state change events such as progress, pause, and resume
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//           default:
//         }
//       },
//       (error) => {
//         // Handle unsuccessful uploads
//       },
//       () => {
//         // Handle successful uploads on complete
//         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log(downloadURL);
//           const user = { ...inputs, img: downloadURL };
//           addUser(user, dispatch);
//         });
//       }
//     );
//   };
//   return (
//     <div className="newUser">
//       <h1 className="newUserTitle">New User</h1>
//       <form className="newUserForm">
//         <div className="newUserItem">
//           <label>Image</label>
//           <input
//             type="file"
//             id="file"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//         </div>
//         <div className="newUserItem">
//           <label>Username</label>
//           <input
//             type="text"
//             name="username"
//             placeholder="john"
//             onChange={handleInputs}
//           />
//         </div>
//         <div className="newUserItem">
//           <label>Full Name</label>
//           <input
//             type="text"
//             name="fullname"
//             placeholder="John Smith"
//             onChange={handleInputs}
//           />
//         </div>
//         <div className="newUserItem">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="john@gmail.com"
//             onChange={handleInputs}
//           />
//         </div>
//         <div className="newUserItem">
//           <label>Phone</label>
//           <input
//             type="text"
//             name="phone"
//             placeholder="+1 123 456 78"
//             onChange={handleInputs}
//           />
//         </div>
//         <div className="newUserItem">
//           <label>Address</label>
//           <input
//             type="text"
//             name="address"
//             placeholder="New York | USA"
//             onChange={handleInputs}
//           />
//         </div>
//         <div className="newUserItem">
//           <label>Active</label>
//           <select
//             className="newUserSelect"
//             name="active"
//             id="active"
//             onChange={handleInputs}
//           >
//             <option value="true">Yes</option>
//             <option value="false">No</option>
//           </select>
//         </div>
//         <button className="newUserButton" onClick={handleClick}>
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }

//------------------------------------------------------------
import { useEffect, useState } from "react";
import "./newUser.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewUserFormInput from "./NewUserFormInput";

export default function NewUser() {
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [disableCreateButton, setDisableCreateButton] = useState(false);

  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const inputs = [
    {
      id: 1,
      name: "fullname",
      type: "text",
      placeholder: "Fullname*",
      errorMessage:
        "Full name should be 3-16 charecter and shouldn't include spacial charecter",
      label: "Fullname",
      pattern: "[A-Za-z0-9 ]{3,25}$",
      required: true,
    },
    {
      id: 2,
      name: "username",
      type: "text",
      placeholder: "Username*",
      errorMessage:
        "Username should be 3-16 charecter and shouldn't include spacial charecter",
      label: "Username",
      pattern: "[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email*",
      errorMessage: "enter a valid email",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password*",
      errorMessage:
        "Password should be 8-20 charecter and atleast 1 char,1 number,1 spacial charecter",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password*",
      errorMessage: "Password not match",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 6,
      name: "phone",
      type: "text",
      placeholder: "Phone*",
      errorMessage: "Phone number should be 10 numbers",
      label: "Phone",
      pattern: `[0-9]{10}$`,
      required: true,
    },
    {
      id: 7,
      name: "address",
      type: "text",
      placeholder: "Address*",
      errorMessage: "Adrress should be alteast 3-16 charecter",
      label: "Address",
      pattern: `[A-Za-z0-9#]{3,16}$`,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //DISABLED THE CREATE BUTTON BASED ON EMPTY FIELDS AND LENGTH OF INPUT VALUE
  useEffect(() => {
    if (
      values.fullname === "" ||
      values.username === "" ||
      values.email === "" ||
      values.password === "" ||
      values.phone === "" ||
      values.address === "" ||
      values.fullname.length < 3 ||
      values.fullname.length > 25 ||
      values.username.length < 3 ||
      values.username.length > 16 ||
      values.password.length < 8 ||
      values.password.length > 16 ||
      values.address.length < 3 ||
      values.address.length > 16 ||
      values.phone.length < 10
    ) {
      setDisableCreateButton(true);
    } else {
      setDisableCreateButton(false);
    }
  }, [values]);

  const handleClick = (e) => {
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
          const user = { ...values, img: downloadURL };
          addUser(user, dispatch);
          navigate("/users");
        });
      }
    );
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {inputs.map((input) => (
          <NewUserFormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div className="newUserItem">
          <label>Active</label>
          <select
            className="newUserSelect"
            name="active"
            id="active"
            onChange={onChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          className="newUserButton"
          onClick={handleClick}
          disabled={disableCreateButton}
        >
          Create
        </button>
      </form>
    </div>
  );
}
