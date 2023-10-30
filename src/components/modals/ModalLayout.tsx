import { ReactNode } from 'react';
import classes from '../../styles/Modal.module.css';

interface PropTypes {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  disabled?: boolean;
  modalClosing: boolean;
}

export function ModalLayout(props: PropTypes) {
  return (
    <div
      className={`${classes.backdrop} ${props.open ? classes.show : ''} ${
        props.modalClosing ? classes.hide : ''
      }`}
      onClick={() => {
        if (!props.disabled) {
          props.onClose();
        }
      }}
    >
      <div
        className={`${classes.modal} ${props.open ? classes.show : ''} ${
          props.modalClosing ? classes.hide : ''
        } px-[16px] py-[32px] sm:p-[32px] rounded shadow-lg border-border border bg-secondary w-[calc(100%-32px)] sm:w-[90%] sm:max-w-[600px]`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={classes.main}>
          <div className={classes.content}>{props.children}</div>
        </div>
      </div>
    </div>
  );
}
