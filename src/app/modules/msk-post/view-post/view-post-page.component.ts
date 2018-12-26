import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../post/post';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../post/post-service';
import {InfoUrl} from '../post/info-url';
import { Address } from '../post/address';
import swal from 'sweetalert2';

declare var require: any;

@Component({
  selector: 'app-register-post-page',
  templateUrl: './view-post-page.component.html',
  styleUrls: ['./view-post-page.component.scss'],
  providers: [
    PostService
  ]
})
export class ViewPostPageComponent implements OnInit {

  post: Post;

  approve: boolean;

  url: string[];

  message: string;

  oldAddress: string;

  ajustes: any;

  listTags: any[] = [];

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private postService: PostService) {

    this.post = new Post();



    this.post.infoUrl = new InfoUrl();
    this.route.params.subscribe(params => {
      this.post.id = params['id'];
    });

  }

  ngOnInit() {

    if (this.post.id != null) {
      this.postService.load(this.post.id, (result, post) => {
        if (post != null) {
          this.post = post;
          this.oldAddress = this.post.address.city;
          this.listTags = this.post.listTags;
        }
        this.loadData();
      });
    } else {
      this.loadData()
    }

  }

  save() {


    if (this.message == "Não") {
      this.post.status = "BLOCKED";
    } else {
      this.post.status = "ACTIVE";
    }

    if(this.oldAddress != this.post.address.city) {
      this.post.address = new Address(this.post.address.city)
    }

      this.postService.save(this.post, (result, company) => {
        if (result.success) {

          this.router.navigate(['list'], { relativeTo: this.route.parent });

        } else {
          console.log("Error");
        }
      });
  }

  changeStatus() {
    // this.approve = value;
    if (this.message == null || this.message == undefined) {
      if (this.approve === true) {
        this.message = "Sim";
      } else {
        this.message = "Não";
      }
    } else {
      if (this.message == "Sim") {
        this.message = "Não";
      } else {
        this.message = "Sim";
      }
    }
  }

  viewSource() {
    window.open(this.post.infoUrl.url);
  }

  loadData() {

    if (this.post.id == null) {
      this.post = new Post();
    }

    this.navBarDataService.changePageTitle('Notícias');


    if (this.post.status === 'ACTIVE') {
      this.approve = true;
    } else {
      this.approve = false;
    }

    this.form = new FormGroup({
      switchApprove: new FormControl(this.approve),
      fgNotification: new FormControl(this.post.fgNotification)
    }, {updateOn: 'change'});

    this.approve = false;
    this.message = "Não";

  }

}
