import {Category} from '../../msk-catalogue/category/category';
import {AddressInfo} from '../../msk-core/address/address-info';
import {SalesOff} from '../../msk-offert/salesoffer/salesOff';
import {GalleryItem} from '../../msk-core/photo/gallery-item';
import {PhotoUpload} from '../../msk-core/photo/photo-upload';
import {Info} from '../../msk-core/info/info';


export class Company {

  id: string;

  idUser: string;

  entity: string;

  document: string;

  country: string;

  name: string;

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

  info: Info;

  fgFeatured: Boolean;

  colorImage: any;

  colorImage2: any;

  rating: number = 3;

  gallery: GalleryItem[];

}
