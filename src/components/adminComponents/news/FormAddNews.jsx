import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import
  {
    createNews,
    fetchAllNews,
  } from "../../../services/adminServices/newsServices";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FormAddNews({ onSuccess, onClose })
{
  const [ formValues, setFormValues ] = useState({
    content: "",
    title: "",
    createdAt: "",
    updatedAt: "",
  });

  const [ error, setError ] = useState({
    content: "",
    title: "",
    createdAt: "",
    updatedAt: "",
  });

  const [ showImage, setShowImage ] = useState(null);
  const [ image, setImage ] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (event) =>
  {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [ name ]: value });
    if (value !== "")
    {
      setError({ ...error, [ name ]: "" });
    } else
    {
      setError({ ...error, [ name ]: name + " must be not empty" });
    }
  };

  const handleChangeFile = (e) =>
  {
    setImage(e.target.files[ 0 ]);
    encodeImageFileAsURL(e.target.files[ 0 ]);
  };

  const encodeImageFileAsURL = (file) =>
  {
    var reader = new FileReader();
    reader.onloadend = function ()
    {
      console.log("RESULT", reader.result);
      setShowImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    if (
      formValues.content &&
      formValues.title &&
      formValues.createdAt &&
      formValues.updatedAt
    )
    {
      const formData = new FormData();
      formData.append("content", formValues.content);
      if (image)
      {
        formData.append("imageUrl", image);
      }
      formData.append("title", formValues.title);
      formData.append("createdAt", formValues.createdAt);
      formData.append("updatedAt", formValues.updatedAt);

      dispatch(createNews(formData)).then((response) =>
      {
        if (response.error)
        {
          console.error("Error:", response.error);
        } else
        {
          onSuccess();
          onClose();
          dispatch(fetchAllNews({ page: 0 }));
        }
      });
    } else
    {
      if (!formValues.content)
      {
        setError((prev) => ({ ...prev, content: "content must be not empty" }));
      }
      if (!formValues.title)
      {
        setError((prev) => ({ ...prev, title: "title must be not empty" }));
      }
      if (!formValues.createdAt)
      {
        setError((prev) => ({
          ...prev,
          createdAt: "createdAt must be not empty",
        }));
      }
      if (!formValues.updatedAt)
      {
        setError((prev) => ({
          ...prev,
          updatedAt: "updatedAt must be not empty",
        }));
      }
    }
  };

  return (
    <>
      <div
        data-state="open"
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        style={ { pointerEvents: "auto" } }
        data-aria-hidden="true"
        aria-hidden="true"
      />
      <div
        role="dialog"
        className="bg-black text-white fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-7 shadow-lg rounded-2xl md:w-full max-w-xl"
        tabIndex={ -1 }
        style={ { pointerEvents: "auto" } }
      >
        <div className="text-white flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-2xl font-bold leading-none tracking-tight">
            Thêm mới Tin tức
          </h2>
        </div>
        <div className="overflow-auto">
          <form className="overflow-y-auto" onSubmit={ handleSubmit }>
            <div className="space-y-4">
              <TextField
                className=" bg-slate-300"
                error={ Boolean(error.title) }
                helperText={ error.title }
                onChange={ handleChange }
                size="small"
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
              />
              <TextField
                className=" bg-slate-300"
                error={ Boolean(error.content) }
                helperText={ error.content }
                onChange={ handleChange }
                size="small"
                name="content"
                label="Content"
                variant="outlined"
                fullWidth
                multiline
                rows={ 4 }
              />
              <Button
                className="bg-slate-300"
                component="label"
                variant="contained"
                startIcon={ <CloudUploadIcon /> }
                fullWidth
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={ handleChangeFile } />
              </Button>
              { showImage && (
                <img
                  src={ showImage }
                  alt="uploaded"
                  width={ 100 }
                  max-height={ 50 }
                />
              ) }
              <TextField
                className="bg-slate-300"
                error={ Boolean(error.createdAt) }
                helperText={ error.createdAt }
                onChange={ handleChange }
                size="small"
                name="createdAt"
                label="Created At"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={ {
                  shrink: true,
                } }
              />
              <TextField
                className="bg-slate-300"
                error={ Boolean(error.updatedAt) }
                helperText={ error.updatedAt }
                onChange={ handleChange }
                size="small"
                name="updatedAt"
                label="Updated At"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={ {
                  shrink: true,
                } }
              />
            </div>
            <div className="mt-6 flex items-center justify-end space-x-2">
              <Button onClick={ onClose } variant="contained" color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </div>
          </form>
        </div>
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close"
          onClick={ onClose }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
