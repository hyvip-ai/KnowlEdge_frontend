export interface SetResetPassword {
  password: string;
  passwordConfirmation: string;
}

export interface SetResetPasswordWithToken extends SetResetPassword {
  token: string | null;
}
