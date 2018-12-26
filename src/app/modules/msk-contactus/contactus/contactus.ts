import {Category} from "../../msk-catalogue/category/category";
import {AddressInfo} from "../../msk-core/address/address-info";
import {TypeContactUs} from "./type-contactus";

export class Contactus{

  id: string;

  idUser: string;

  message: string;

  creationDate: number;

  status: string;

  typeContactUs: TypeContactUs;

  get creationDateDate(): Date {
    return new Date(this.creationDate);
  }
}
