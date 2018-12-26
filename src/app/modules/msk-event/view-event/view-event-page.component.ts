import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../event/event';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../event/event-service';
import {User} from '../../msk-user/user/user';
import {UserService} from '../../msk-user/user/user-service';
import {StorageUtils} from '../../../utils/storage-utils';

declare var require: any;

@Component({
  selector: 'app-register-event-page',
  templateUrl: './view-event-page.component.html',
  styleUrls: ['./view-event-page.component.scss'],
  providers: [
    EventService,
    UserService,
    StorageUtils
  ]
})
export class ViewEventPageComponent implements OnInit {

  event: Event;

  listUser: User[];

  fgApprove: Boolean;

  url: string[];

  urlApprove: boolean;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private userService: UserService,
              private eventService: EventService,
              private storageUtils: StorageUtils) {

    if (this.storageUtils.getRoleId() != 'admin') {
      window.location.href = 'pages/login';
    }

    this.event = new Event();
    this.fgApprove = false;

    this.route.params.subscribe(params => {
      this.event.id = params['id'];
    });

    this.url = window.location.pathname.split('/');

    if (this.url[3] == 'viewConfirm') {
      this.urlApprove = true;
    } else {
      this.urlApprove = false;
    }

    this.form = new FormGroup({
      switchApprove: new FormControl(this.fgApprove),
      desc: new FormControl()
    }, {updateOn: 'change'});
  }

  ngOnInit() {

    if (this.event.id != null) {
      this.eventService.load(this.event.id, (result, event) => {
        if (event != null) {
          this.event = event;

        }
        this.loadData();
      });
    }
    else {
      this.loadData()
    }

  }


  loadData() {

    if (this.event.id == null) {
      this.event = new Event();
    }

    this.navBarDataService.changePageTitle('Visualizar')


  }

  save() {

    this.event.info.fgApprove = this.fgApprove;

    if (this.form.valid) {
      this.eventService.saveMobile(this.event, (result, event) => {
        if (result.success) {

          this.router.navigate(['listConfirm'], {relativeTo: this.route.parent});
          console.log(result.success)
        }
        else {
          console.log('Error');
        }
      });
    }
  }

}
