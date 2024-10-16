import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  useAddPictureMutation,
  useUpdateNodesMutation,
} from "../../../nodesAPI";
import {
  BigImg,
  CrossIcon,
  DelBtn,
  FormContainer,
  HiddenFileInput,
  ImagePreview,
  ImgInput,
} from "./nodeFormStyled";
import Notiflix, { Notify } from "notiflix";
import { qustionMark } from "../../../constants/pictures";

const defaultURL = "http://localhost:4000";
const defaulImg = `${defaultURL}/${qustionMark}`;
let prevImgURL = "";

export const NodeForm = ({ el, onClose }) => {
  const { data, id, position, type } = el;

  const [addPicture] = useAddPictureMutation();
  const [updateNodes] = useUpdateNodesMutation();

  if (el.data.fileURL) {
    prevImgURL = `${defaultURL}/${el.data.fileURL}`;
  } else {
    prevImgURL = defaulImg;
  }

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(prevImgURL);
 
  useEffect(() => {
    if (imageFile) {
      handleAddImg();

      updateNodes({ id: id, position });
      

    }
  }, [imageFile]);

 
  const handleAddImg = () => {
    if (imageFile) {
      const bodyFormData = new FormData();
      bodyFormData.append("fileURL", imageFile);

      addPicture({ id, bodyFormData })
        .unwrap()
        .then(() => {
          Notify.success("Node is updated successfully");
        })
        .catch((error) =>
          Notify.failure(error?.data?.message || "Something went wrong")
        );
    }
  };
  const handleChange = (e) => {
    const newImage = e.target.files[0];
    if (newImage) {
      setImageFile(newImage);
      setPreviewUrl(URL.createObjectURL(newImage));
    }
  };
  const onDeleteImg = async () => {
    setImageFile(null);
    setPreviewUrl(`${defaultURL}/${qustionMark}`);
    await addPicture({ id });
    await updateNodes({
      id: id,
      position
      
    });
  };

  const handleSubmit = async(values) => {
    await updateNodes({
      id: id,
      position,
      data: {
        ...data,
        label: values.head, 
      },
      type: values.type
    });
    
      onClose()
  };

  const initialValues = {
    fileURL: previewUrl,
    head: data.label,
    type: type,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>{el.data.label}</h2>
          <BigImg src={previewUrl} alt={data.label} />
        </div>

        <FormContainer>
          <ImgInput>
            <ImagePreview src={previewUrl} alt={data.label} />
            <HiddenFileInput
              type="file"
              name="fileURL"
              id="fileURL"
              accept="image/*"
              onChange={handleChange}
            />

            <DelBtn 
            type="button" 
            onClick={() => onDeleteImg()}>
              {" "}
              <CrossIcon />{" "}
            </DelBtn>

          </ImgInput>

          <label>
            Node name
            <Field 
            type="text" 
            name="head" 
            id="head" 
            
            />
          </label>
          Node Type
          <div>
            <Field type="radio" name="type" id="type" value="textUpdater" />
            <label>Updater</label>
          </div>
          <div>
            <Field type="radio" name="type" id="type" value="outPut" />
            <label>Output</label>
          </div> 
          <button type="submit"> Update </button>
        </FormContainer>
      </div>
    </Formik>
  );
};
