// import { useState } from "react";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import "./newProduct.css";
// import app from "../../firebase";
// import { addProduct } from "../../redux/apiCalls";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function NewProduct() {
//   const [inputs, setInputs] = useState({});
//   const [file, setFile] = useState(null);
//   const [cat, setCat] = useState([]);
//   const navigate=useNavigate();
//   const dispatch = useDispatch();

//   const handleInput = (e) => {
//     setInputs((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };

//   const handleCat = (e) => {
//     setCat(e.target.value.split(","));
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
//           const product = { ...inputs, img: downloadURL, categories: cat };
//           addProduct(product, dispatch);
//           navigate("/products")
//         });
//       }
//     );
//   };
//   return (
//     <div className="newProduct">
//       <h1 className="addProductTitle">New Product</h1>
//       <form className="addProductForm">
//         <div className="addProductItem">
//           <label>Image</label>
//           <input
//             type="file"
//             id="file"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//         </div>
//         <div className="addProductItem">
//           <label>Title</label>
//           <input
//             name="title"
//             type="text"
//             placeholder="Apple Airpods"
//             onChange={handleInput}
//           />
//         </div>
//         <div className="addProductItem">
//           <label>Description</label>
//           <input
//             name="desc"
//             type="text"
//             placeholder="Description"
//             onChange={handleInput}
//           />
//         </div>
//         <div className="addProductItem">
//           <label>Price</label>
//           <input
//             name="price"
//             type="number"
//             placeholder="100"
//             onChange={handleInput}
//           />
//         </div>
//         <div className="addProductItem">
//           <label>Categories</label>
//           <input type="text" placeholder="jeans,shirts" onChange={handleCat} />
//         </div>
//         <div className="addProductItem">
//           <label>Stock</label>
//           <select name="inStock" onChange={handleInput}>
//             <option value="true">Yes</option>
//             <option value="false">No</option>
//           </select>
//         </div>
//         <button className="addProductButton" onClick={handleClick}>
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }
//---------------------------------------------------------------------------------
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./newProduct.css";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewProductFormInput from "./NewProductFormInput";

export default function NewProduct() {
  // const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [disableCreateButton, setDisableCreateButton] = useState(false);

  const [values, setValues] = useState({
    title: "",
    desc: "",
    price: "",
  });

  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Title*",
      errorMessage:
        "Title should be 3-16 charecter and shouldn't include spacial charecter",
      label: "Title",
      pattern: "[A-Za-z0-9 ]{3,25}$",
      required: true,
    },
    {
      id: 2,
      name: "desc",
      type: "text",
      placeholder: "Description*",
      errorMessage:
        "Description should be 3-16 charecter and shouldn't include spacial charecter",
      label: "Description",
      pattern: "[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "price",
      type: "number",
      placeholder: "Price*",
      errorMessage: "enter a price",
      label: "Price",
      pattern: "[0-9]{2,5}$",
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  //DISABLED THE CREATE BUTTON BASED ON EMPTY FIELDS AND LENGTH OF INPUT VALUE
  useEffect(() => {
    if (
      values.title === "" ||
      values.desc === "" ||
      values.price === "" ||
      values.title.length < 3 ||
      values.title.length > 25 ||
      values.desc.length < 3 ||
      values.desc.length > 16 ||
      values.price.length < 1 ||
      values.price.length > 5
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
          const product = { ...values, img: downloadURL, categories: cat };
          addProduct(product, dispatch);
          navigate("/products");
        });
      }
    );
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {inputs.map((input) => (
          <NewProductFormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,shirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={onChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          className="addProductButton"
          onClick={handleClick}
          disabled={disableCreateButton}
        >
          Create
        </button>
      </form>
    </div>
  );
}
