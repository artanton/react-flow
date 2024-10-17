import React from "react";
import { Field, Formik } from "formik";
import { AnimatedOption, AnimatedOptionList, EdgeFormContainer, EdgeName, TypeOption, TypeOptionList } from "./edgeFormStyled";
import { useUpdateEdgeMutation } from "../../../nodesAPI";

export const EdgeForm = ({ el, onClose }) => {
     const { id, animated, label, type } = el;
// console.log(typeof(animated));
  const [updateEdge] = useUpdateEdgeMutation();

  const handleSubmit = async(values) => {
    console.log(typeof(values.animated));
    await updateEdge({
        id: id,
        animated: values.animated,
        label: values.label,
        type: values.type,
    });

    onClose();

  };

  const initialValues = {
      animated: animated,
      label: label,
    type: type,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>{el.label} </h2>
          <EdgeFormContainer>

            <EdgeName>
              Edge label
              <Field type="text" id="label" name="label" />
            </EdgeName>

            <AnimatedOption>
              Animated

              <AnimatedOptionList>

              <label>
                <Field
                  type="radio"
                  name="animated"
                  id="animated"
                  value={false}
                />
                Flat
              </label>

              <label>
                <Field
                  type="radio"
                  name="animated"
                  id="animated"
                  value= {true}
                />
                Animated
              </label>
              </AnimatedOptionList>


            </AnimatedOption>

            <TypeOption>
              Edge Type
              <TypeOptionList>
              <label>
                  <Field type="radio" name="type" id="type" value="straight" />
                  Straight
                </label>
                <label>
                  <Field type="radio" name="type" id="type" value="step" />
                  Step
                </label>
                <label>
                  <Field type="radio" name="type" id="type" value="smoothstep"/>
                  Smooth Step
                </label>
               
                <label>
                  <Field type="radio" name="type" id="type" value="default" />
                  Bezier
                </label>
              </TypeOptionList>
            </TypeOption>
            <button type="submit"> Update </button>
          </EdgeFormContainer>
        </div>
      </>
    </Formik>
  );
};
