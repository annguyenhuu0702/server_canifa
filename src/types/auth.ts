export interface register extends login {
  fullname: string;
}

export interface login {
  email: string;
  password: string;
}

export interface typeAuth {
  user: any;
  accessToken: string;
}

export interface changeProfile {
  fullname: string;
  birthday: Date;
  gender: boolean;
}

export interface changePassword {
  currentpassword: string;
  newpassword: string;
}

export interface changeEmail {
  email: string;
}
