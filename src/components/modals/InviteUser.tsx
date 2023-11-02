import { useForm } from 'react-hook-form';
import { ModalLayout } from '.';
import { InviteUserForm, ModalProps } from '../../interfaces';
import { PrimaryButton } from '../common';
import { TextAreaInput } from '../form';
import { useInviteUser } from '../../hooks';
import { toastMessage } from '../../utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const schema = yup.object().shape({
  emails: yup
    .string()
    .trim()
    .test({
      name: 'email',
      message: 'Invalid email address in the list',
      test: (value) =>
        value
          ? value
              .split(',')
              .map((email) => email.trim())
              .map(isEmail)
              .every((value) => value === true)
          : false,
    })
    .required('Emails are required')
    .defined(),
});

const defaultValues: InviteUserForm = {
  emails: '',
};

export function InviteUser(props: ModalProps) {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useInviteUser();

  const onSubmit = async (formData: InviteUserForm) => {
    try {
      const emails = formData.emails.split(',').map((email) => email.trim());
      if (emails.length > 3) {
        throw new Error("Can't invite more than 5 users at once");
        return;
      }
      await mutateAsync({ emails });
      queryClient.invalidateQueries(['all-users']);
      toastMessage.success('Invited users successfully');
      props.onClose();
    } catch (err) {
      toastMessage.error(err);
    }
  };
  return (
    <ModalLayout
      modalClosing={props.modalClosing}
      open={props.open}
      onClose={props.onClose}
    >
      <div className='bg-secondary shadow-md text-left'>
        <h1 className='text-xl text-primary font-semibold mb-6'>
          Invite Users
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-6'>
            <TextAreaInput
              name='emails'
              control={control}
              label='Enter Emails (Comma Separated)'
              placeholder='Enter all email'
            />
          </div>
          <PrimaryButton
            type='submit'
            isDisabled={isLoading}
            isLoading={isLoading}
          >
            Invite Users
          </PrimaryButton>
        </form>
      </div>
    </ModalLayout>
  );
}
