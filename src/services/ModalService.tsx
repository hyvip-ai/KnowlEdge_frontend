import {
  ComponentType,
  ReactNode,
  createContext,
  useRef,
  useState,
} from 'react';
import { Modal } from '../components/modals';
import { ErrorResponse } from '../model';
import { ModalProps } from '../interfaces';

interface PropTypes {
  children: ReactNode;
}

interface RefInterface {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (value: ErrorResponse) => void;
}

interface OpenConfirmationProps {
  Component: ComponentType<ModalProps>;
  errorMessage: string;
  [prop: string]: any;
}

const contextDefaultValue = (
  _options: OpenConfirmationProps
): Promise<string> => {
  return new Promise<string>((_resolve, _reject) => {});
};

export const ConfirmationContext = createContext(contextDefaultValue);

export const ModalProvider = (props: PropTypes) => {
  const [modalState, setModalState] = useState<OpenConfirmationProps | null>(
    null
  );
  const [modalClosing, setModalClosing] = useState<boolean>(false);

  const awaitingPromiseRef = useRef<RefInterface>();

  const openConfirmation = (
    options: OpenConfirmationProps
  ): Promise<string> => {
    setModalState(options);
    return new Promise<string>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    setModalClosing(true);
    setTimeout(() => {
      if (awaitingPromiseRef.current) {
        awaitingPromiseRef.current.reject({
          error: 'BAD_REQUEST_ERROR',
          message: modalState!.errorMessage,
          statusCode: 400,
        });
      }

      setModalState(null);
      setModalClosing(false);
    }, 150);
  };

  const handleSubmit = (data: string) => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve(data);
    }

    setModalState(null);
  };

  return (
    <>
      <ConfirmationContext.Provider value={openConfirmation}>
        {props.children}
      </ConfirmationContext.Provider>

      {modalState ? (
        <Modal
          open={Boolean(modalState)}
          onSubmit={handleSubmit}
          onClose={handleClose}
          modalClosing={modalClosing}
          {...modalState}
        />
      ) : null}
    </>
  );
};
