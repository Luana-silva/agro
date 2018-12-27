import {Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../post/post-service';
import {Post} from '../post/post';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import swal from 'sweetalert2';
import {StorageUtils} from '../../../utils/storage-utils';
import {DateFormatPipe3} from '../../../pipes/date-format.pipe3';

declare var require: any;

@Component({
  selector: 'app-list-post-page',
  templateUrl: './list-post-page.component.html',
  styleUrls: ['./list-post-page.component.scss',
  '../../../../assets/fonts/icofont.css',
  ],
  providers: [
    PostService,
    DateFormatPipe3,
    StorageUtils
  ]
})
export class ListPostPageComponent implements OnInit {

  scrollBarHorizontal = (window.innerWidth < 1200);

  post: Post;

  rows = {};
  rowsPage = [];
  page = {
    size: 10,
    totalElements: 0,
    totalPages: 0,
    pageNumber: 1
  }

  loadingIndicator = true;
  reorderable = true;

  url: string[];
  urlApprove: boolean;

  // DataTable Content Titles
  columns = [
    {prop: 'nome', name: 'Nome'},
    {prop: 'email', name: 'Email'},
    {prop: 'Post', name: 'Post'}
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private postService: PostService,
              private navBarDataService: NavBarDataService,
              private storageUtils: StorageUtils) {



    if (this.storageUtils.getRoleId() == 'event' || this.storageUtils.getRoleId() == 'null') {
      window.location.href = 'pages/login';
    }

    this.post = new Post();

    this.url = window.location.pathname.split('/');

    if (this.url[3] === 'listConfirm') {
      this.urlApprove = true;
    } else {
      this.urlApprove = false;
    }

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  ngOnInit() {

    this.selectTable();

    if (!this.urlApprove) {
      this.navBarDataService.changePageTitle('Notícias')
    } else {
      this.navBarDataService.changePageTitle('Notícias')
    }

  }

  selectTable() {
    this.postService.listPending({page: this.page.pageNumber}, (result, list: any) => {
      console.log(result, list);
      if (list != null) {
        if (this.page.pageNumber === 1) {
          // pego aqui o total apenas umas vez...
          // nesse caso a api tbm só precisaria pegar o total na 1a vez, consumindo menos banda e diminuindo o overhead da chamada

          this.page.totalElements = list.totalAmount;
          this.page.totalPages = list.pageQuantity;
        }

        this.rows[this.page.pageNumber] = list.listPosts;
        this.rowsPage = list.listPosts;
      }
    });
  }

  view(row: any) {
    if (this.urlApprove) {
      this.router.navigate(['viewConfirm', row.id], {relativeTo: this.route.parent});
    } else {
      this.router.navigate(['view', row.id], {relativeTo: this.route.parent});
    }

  }

  viewConfirm(row: any) {
    this.router.navigate(['view', row.id], {relativeTo: this.route.parent});
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rowsPage.filter(function (data) {

      let creationDate = new DateFormatPipe3('en-US').transform(data.creationDate);
      return (data.data.toLowerCase().indexOf(val) !== -1) || (creationDate.toString().includes(val) || !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  setPage(pageInfo) {
    // esse +1 é devido sua api iniciar em 1 e não em 0...
    this.page.pageNumber = pageInfo.offset + 1;
    if (this.rows[this.page.pageNumber]) {
      this.rowsPage = this.rows[this.page.pageNumber]
    } else {
      this.selectTable();
    }
  }

}
