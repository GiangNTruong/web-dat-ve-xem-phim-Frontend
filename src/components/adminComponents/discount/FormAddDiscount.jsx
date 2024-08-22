import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import {
  createDiscount,
  fetchAllDiscounts,
} from "../../../services/adminServices/discountServices";

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

export default function FormAddDiscount({ onSuccess, onClose }) {
  const [formValues, setFormValues] = useState({
    code: "",
    description: "",
    discountPercentage: 0,
    isUsed: false,
    validFrom: "",
    validTo: "",
  });

  const [error, setError] = useState({
    code: "",
    description: "",
    discountPercentage: "",
    validFrom: "",
    validTo: "",
  });

  const [showImage, setShowImage] = useState(null);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    if (value !== "") {
      setError({ ...error, [name]: "" });
    } else {
      setError({ ...error, [name]: `${name} must be not empty` });
    }
  };

  const handleChangeFile = (e) => {
    setImage(e.target.files[0]);
    encodeImageFileAsURL(e.target.files[0]);
  };

  const encodeImageFileAsURL = (file) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      console.log("RESULT", reader.result);
      setShowImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formValues.code &&
      formValues.description &&
      formValues.discountPercentage &&
      formValues.validFrom &&
      formValues.validTo
    ) {
      const formData = new FormData();
      formData.append("code", formValues.code);
      formData.append("description", formValues.description);
      formData.append("discountPercentage", formValues.discountPercentage);
      formData.append("isUsed", formValues.isUsed);
      formData.append("validFrom", formValues.validFrom);
      formData.append("validTo", formValues.validTo);
      if (image) {
        formData.append("imageUrl", image);
      }

      dispatch(createDiscount(formData)).then((response) => {
        if (response.error) {
          console.error("Error:", response.error);
        } else {
          onSuccess();
          onClose();
          dispatch(fetchAllDiscounts({ page: 0 }));
        }
      });
    } else {
      if (!formValues.code) {
        setError((prev) => ({ ...prev, code: "code must be not empty" }));
      }
      if (!formValues.description) {
        setError((prev) => ({
          ...prev,
          description: "description must be not empty",
        }));
      }
      if (!formValues.discountPercentage) {
        setError((prev) => ({
          ...prev,
          discountPercentage: "discountPercentage must be not empty",
        }));
      }
      if (!formValues.validFrom) {
        setError((prev) => ({
          ...prev,
          validFrom: "validFrom must be not empty",
        }));
      }
      if (!formValues.validTo) {
        setError((prev) => ({
          ...prev,
          validTo: "validTo must be not empty",
        }));
      }
    }
  };

  return (
    <>
      <div
        data-state="open"
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        style={{ pointerEvents: "auto" }}
        data-aria-hidden="true"
        aria-hidden="true"
      />
      <div
        role="dialog"
        className="bg-black text-white fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-7 shadow-lg rounded-2xl md:w-full max-w-xl"
        tabIndex={-1}
        style={{ pointerEvents: "auto" }}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-2xl font-bold leading-none tracking-tight">
            Thêm mới Discount
          </h2>
        </div>
        <div className="overflow-auto">
          <form className="overflow-y-auto" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <TextField
                className="bg-slate-300"
                error={Boolean(error.code)}
                helperText={error.code}
                onChange={handleChange}
                size="small"
                name="code"
                label="Mã Code"
                variant="outlined"
                fullWidth
              />
              <TextField
                className="bg-slate-300"
                error={Boolean(error.description)}
                helperText={error.description}
                onChange={handleChange}
                size="small"
                name="description"
                label="Miêu tả"
                variant="outlined"
                fullWidth
              />
              <TextField
                className="bg-slate-300"
                error={Boolean(error.discountPercentage)}
                helperText={error.discountPercentage}
                onChange={handleChange}
                size="small"
                name="discountPercentage"
                label="Chiết khấu"
                type="number"
                variant="outlined"
                fullWidth
              />
              <TextField
                className="bg-slate-300"
                error={Boolean(error.validFrom)}
                helperText={error.validFrom}
                onChange={handleChange}
                size="small"
                name="validFrom"
                label="Ngày bắt đầu"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className="bg-slate-300"
                error={Boolean(error.validTo)}
                helperText={error.validTo}
                onChange={handleChange}
                size="small"
                name="validTo"
                label="Ngày kết thúc"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                className="bg-slate-300"
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleChangeFile} />
              </Button>
              {showImage && (
                <img
                  src={showImage}
                  alt="uploaded"
                  width={100}
                  max-height={50}
                />
              )}
              <div className="space-y-2 w-full">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="isUsed"
                >
                  Đã sử dụng
                </label>
                <input
                  className="ml-2"
                  id="isUsed"
                  aria-describedby="isUsed-description"
                  aria-invalid="false"
                  type="checkbox"
                  checked={formValues.isUsed}
                  name="isUsed"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end space-x-2">
              <Button onClick={onClose} variant="contained" color="secondary">
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
          onClick={onClose}
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
