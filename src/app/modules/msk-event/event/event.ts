import {Category} from '../../msk-catalogue/category/category';
import {AddressInfo} from '../../msk-core/address/address-info';
import {SalesOff} from '../../msk-offert/salesoffer/salesOff';
import {companyCard} from '../../msk-company/company-card/company-card';
import {GalleryItem} from '../../msk-core/photo/gallery-item';

export class Event {

  id: string;

  name: string;

  begin: Date;

  end: Date;

  userName: string;

  userEmail: string;

  primaryColor: string;

  secundaryColor: string;

  mainMessage: string;

  secondaryMessage: string;

  compamiesIds: string[];

  companies: companyCard[];

  idUser: string;

  entity: string;

  document: string;

  country: string;

  desc: string;

  fantasyName: string;

  addressInfo: AddressInfo;

  salesOff: SalesOff[];

  email: string;

  state: string;

  city: string;

  district: string;

  contact: string;

  phone: string;

  creationDate: Date;

  status: string;

  countPending: number;

  categories: Category[];

  info: any;

  fgFeatured: Boolean;

  colorImage: any;

  colorImage2: any;

  rating: number;

  gallery: GalleryItem[];

}
