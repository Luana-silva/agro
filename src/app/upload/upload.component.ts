import {
  Input,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Component,
  OnInit,
  EventEmitter
} from '@angular/core';

import {Constants} from "../utils/constants";
import {StorageUtils} from "../utils/storage-utils";

// import * as Dropzone from '../../assets/vendor/dropzone/dropzone.js';
import * as Dropzone from 'dropzone';

const URL = Constants.SERVICE_URL + Constants.SERVICE_PROJETC + 'company/uploadCompanyImage';

@Component({
  moduleId: module.id,
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Input() id_object?: string;
  @Input() url?: string = URL;
  @Input() uploadMultiple?: boolean = true;
  @Input() maxFiles?: number = 200;
  @Input() maxFilesize?: number = 10;
  @Input() thumbnailWidth?: number = 250;
  @Input() thumbnailHeight?: any = null;
  @Input() parallelUploads?: number = 200;
  @Input() acceptedFiles?: string = '.png,.jpg,.jpeg';
  @Output() uploadedImages = new EventEmitter();


  public myDropzoneNG: any = Dropzone;
  srcArray: any;

  constructor(private _elementRef: ElementRef, private storage: StorageUtils) {

  }

  ngOnInit() {
    this.loadingDropzone();
  }

  public loadingDropzone() {
    let self = this;

    // Dropzone.options.myDropzone = false;
    // Disabling autoDiscover
    Dropzone.autoDiscover = false;
    // Get the template HTML and remove it from the doument
    let previewNode = <HTMLElement>document.querySelector('#template');
    previewNode.id = '';
    let previewTemplate = (<HTMLElement>previewNode.parentNode).innerHTML;
    previewNode.parentNode.removeChild(previewNode);

    self.myDropzoneNG = new Dropzone('div#my-dropzone', { // Make the whole body a dropzone
      url: self.url, // Set the url
      method: 'post',
      paramName: 'file',
      uploadMultiple: self.uploadMultiple,
      maxFiles: self.maxFiles,
      maxFilesize: self.maxFilesize,
      thumbnailWidth: self.thumbnailWidth,
      thumbnailHeight: self.thumbnailHeight,
      parallelUploads: self.parallelUploads,
      acceptedFiles: self.acceptedFiles,
      previewTemplate: previewTemplate,
      autoQueue: false, // Make sure the files aren't queued until manually added
      previewsContainer: '#previews', // Define the container to display the previews
      clickable: '.fileinput-button', // Define the element that should be used as click trigger to select files.
      headers: self.httpOptions(),
      params: {id_object: self.id_object},
      // The setting up of the dropzone
      init: function () {
        let myDropzone = this;

        // First change the button to actually tell Dropzone to process the queue.
        this.element.querySelector('button[type=submit]').addEventListener('click', function (event) {
          // Make sure that the form isn't actually being sent.
          event.preventDefault();
          event.stopPropagation();
          myDropzone.processQueue();
        });

        // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
        // of the sending event because uploadMultiple is set to true.
        this.on('sendingmultiple', function () {
          // Gets triggered when the form is actually being sent.
          // Hide the success button or the complete form.
        });
        this.on('successmultiple', function (files, response) {
          // Gets triggered when the files have successfully been sent.
          // Redirect user or notify of success.
        });
        this.on('errormultiple', function (files, response) {
          // Gets triggered when there was an error sending the files.
          // Maybe show form again, and notify user of error
        });
      }
    });

    self.myDropzoneNG.on('addedfile', function (file) {
      // Hookup the start button
      file.previewElement.querySelector('.start').onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        self.myDropzoneNG.enqueueFile(file);
      };
    });

    // Update the total progress bar
    self.myDropzoneNG.on('totaluploadprogress', function (progress) {
      self._elementRef.nativeElement.querySelector('#total-progress .progress-bar').style.width = progress + '%';
    });

    self.myDropzoneNG.on('sending', function (file, xhr, formData) {
      // Show the total progress bar when upload starts
      self._elementRef.nativeElement.querySelector('#total-progress').style.opacity = '1';
      // formData.append('filesize', file.size);
      // formData.append('id_object', self.id_object);
      // formData.append('data',  "{\"width\":200.0}");
      // And disable the start button
      file.previewElement.querySelector('.start').setAttribute('disabled', 'disabled');

    });

    // Hide the total progress bar when nothing's uploading anymore
    self.myDropzoneNG.on('queuecomplete', function (progress) {
      self._elementRef.nativeElement.querySelector('#total-progress').style.opacity = '0';
      self.myDropzoneNG.processQueue();
      self.srcArray = self.myDropzoneNG.files.map(f => f.dataURL);
      self.uploadedImages.emit({srcArray: self.srcArray});
      // clear all previews
      self.myDropzoneNG.removeAllFiles(true);
    });

    // Setup the buttons for all transfers
    // The "add files" button doesn't need to be setup because the config
    // `clickable` has already been specified.

    let actionsStart = self._elementRef.nativeElement.querySelector('#actions .start');
    if (actionsStart) {
      actionsStart.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        self.myDropzoneNG.enqueueFiles(self.myDropzoneNG.getFilesWithStatus(Dropzone.ADDED));
      });
    }

    let actionsCancel = self._elementRef.nativeElement.querySelector('#actions .cancel');
    if (actionsCancel) {
      actionsCancel.addEventListener('click', function () {
        self.myDropzoneNG.removeAllFiles(true);
      });
    }

  }

  private httpOptions(): {} {
    return {
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storage.getToken()
    };
  }

}
