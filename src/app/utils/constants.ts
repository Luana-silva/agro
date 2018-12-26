import {UserB} from "../modules/msk-admin/user-b/user-b";

export class Constants {

  //Homolog
  //public static get SERVICE_URL(): string { return "http://dev.mangobits.net"; };

  //10
  // public static get SERVICE_URL(): string { return "http://192.168.123.10:8080"; };
  public static get SERVICE_URL(): string { return "http://mangobits.servebeer.com:8080"; };

  //Desenvolvimeno
  // public static get SERVICE_URL(): string { return "http://127.0.0.1:8080"; };

  public static get SERVICE_PROJETC(): string { return "/AgroAZWs/rs/"; };

  static readonly DATE_FMT = 'dd/MM/yyyy';
  static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm:ss`;
}
