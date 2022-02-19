import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-template',
  templateUrl: './error-template.component.html',
  styleUrls: ['./error-template.component.css']
})
export class ErrorTemplateComponent {
  @Input() printError: boolean = false
  @Input() errorConnexion: boolean = false
  @Input() errorMessage: string = ""

  constructor() {
  }


}
