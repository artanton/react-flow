import { Form } from "formik";
import styled from "styled-components";

export const EdgeFormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
  padding: 40px;
`;

export const EdgeName = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 22px;
`;

export const AnimatedOption = styled.label`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 22px;
`;

export const AnimatedOptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
`;

export const TypeOption = styled.label`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 22px;
`;

export const TypeOptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
`;