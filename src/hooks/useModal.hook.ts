import { useContext } from 'react';
import { ConfirmationContext } from '../services';

export const useModal = () => useContext(ConfirmationContext);
