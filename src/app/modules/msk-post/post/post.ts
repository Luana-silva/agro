import {UserCard} from '../../msk-user/user/user-card';
import {InfoUrl} from './info-url';
import {Address} from './address';
export class Post {


  id: string;

  creationDate: Date;

  desc: string;

  userCreator: UserCard;

  likes: number;

  views: number;

  time: number;

  distance: number;

  comments: number;

  type: string;

  // gallery: [];

  status: string;
  

  infoUrl: InfoUrl;

  totalViews: number;

  address: Address;

  fgNotification: boolean;

  listTags: any; 

  listPosts: any;
}
