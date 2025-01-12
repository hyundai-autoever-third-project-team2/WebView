import styled, { css } from 'styled-components';

export const ImageUploadButtonLabel = styled.label<{
  $width: number;
  $height: number;
  $backgroundColor: string | undefined;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.2);
  background-color: #e3e3e3;

  cursor: pointer;
  transition: 0.3s;

  ${({ $width, $height, $backgroundColor }) => css`
    width: ${$width}px;
    height: ${$height}px;
    background-color: ${$backgroundColor};
  `}

  &:hover {
    background-color: #d3d3d3;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;
export const ImageInput = styled.input`
  display: none;
`;
