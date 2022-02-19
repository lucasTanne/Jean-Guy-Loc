import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-template',
  templateUrl: './success-template.component.html',
  styleUrls: ['./success-template.component.css']
})
export class SuccessTemplateComponent {
  @Input() printSuccess: boolean = false
  @Input() messageSuccess: string = ""

  constructor() { }
}
