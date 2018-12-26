import {BackofficeRole} from "../role/backoffice-role";
import {AddressInfo} from "../../msk-core/address/address-info";


export class UserB{

  id: string;

  idFacebook: string;

  email: string;

  name: string;

  password: string;

  oldPassword: string;

  creationDate: Date;

  status: string;

  token: string;

  phoneNumber: number;

  phoneCountryCode: number;

  tokenExpirationDate: Date;

  userConfirmed: boolean;

  emailConfirmed: boolean;

  phoneConfirmed: boolean;

  role: BackofficeRole;

  info: { [index: string]: string };

  color: string;

  lastAddress: AddressInfo;

  lastLogin: Date;

  urlHome: string;
}
