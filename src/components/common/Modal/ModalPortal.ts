import { createPortal } from 'react-dom';

export const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const modalDomNode = document.getElementById('modal');
  if (modalDomNode) return createPortal(children, modalDomNode);
};
