import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {RestService} from '../../msk-core/service/rest-service';
import {StorageUtils} from '../../../utils/storage-utils';
import {JsonContainer} from '../../msk-core/service/json-container';
import {Post} from './post';
import {PhotoUpload} from '../../msk-core/photo/photo-upload';


@Injectable()
export class PostService extends RestService {

  constructor(private client: HttpClient, private storageUtils: StorageUtils) {
    super(client, 'postExt', storageUtils);
  }

  changePostNewsStatus(post: Post, callback: (result: JsonContainer, post: Post) => void) {
    this.executePost('changePostNewsStatus', post, callback)
  }

  changeStatus(id: string, callback: (result: JsonContainer) => void) {
    this.executeGet('changeStatus/' + id , callback)
  }

  listPending(post: any, callback: (result: JsonContainer, roles: Post[]) => void) {
    this.executePost('listPending', post, callback)
  }

  load(id: string, callback: (result: JsonContainer, roles: Post) => void) {
    this.executeGet('load/' + id, callback)
  }

  save(post: Post, callback: (result: JsonContainer, post: Post) => void) {
    this.executePost('save', post, callback)
  }
}
