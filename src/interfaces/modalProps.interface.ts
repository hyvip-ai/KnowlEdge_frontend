export interface ModalProps {
  open: boolean;
  onSubmit: (data: string) => void;
  onClose: () => void;
  [prop: string]: any;
}
