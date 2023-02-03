import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 760px) {
      ${props}
    }
  `;
};
export const small = (props) => {
  return css`
    @media only screen and (max-width: 450px) {
      ${props}
    }
  `;
};
export const extraSmall = (props) => {
  return css`
    @media only screen and (max-width: 280px) {
      ${props}
    }
  `;
};
