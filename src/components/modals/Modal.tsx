import { ComponentType } from 'react';
import { ModalProps } from '../../interfaces';

interface PropTypes {
  open: boolean;
  onSubmit: (data: string) => void;
  onClose: () => void;
  Component: ComponentType<ModalProps>;
  [prop: string]: any;
}

export const Modal = ({
  Component,
  onClose,
  onSubmit,
  open,
  ...rest
}: PropTypes) => (
  <Component open={open} onSubmit={onSubmit} onClose={onClose} {...rest} />
);
