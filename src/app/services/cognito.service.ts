import { Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from '../../environments/environment';
import { awsConfig } from '../aws-config';
Amplify.configure(awsConfig);

@Injectable()
export class CognitoService {
  public static _REGION = environment.region;

  public static _IDENTITY_POOL_ID = environment.identityPoolId;
  public static _USER_POOL_ID = environment.userPoolId;
  public static _CLIENT_ID = environment.clientId;

  public static _POOL_DATA: any = {
    UserPoolId: CognitoService._USER_POOL_ID,
    ClientId: CognitoService._CLIENT_ID
  };

  constructor() {

  }

  login(user: User) {
    return Auth.signIn(user.email, user.password);
  }

  logout() {
    return Auth.signOut();
  }

  changePassword(oldPassword: string, newPassword: string) {
    return Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, oldPassword, newPassword);
      });
  }

  getCurrentSession() {
    return Auth.currentSession();
  }

}

export class User {
  constructor(
    public email,
    public password
  ) { }
}
