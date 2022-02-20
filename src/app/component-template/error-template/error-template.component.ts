import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LastPagePayload } from 'src/types/page';

@Component({
  selector: 'app-error-template',
  templateUrl: './error-template.component.html',
  styleUrls: ['./error-template.component.css']
})
export class ErrorTemplateComponent {
  @Input() printError: boolean = false
  @Input() errorConnexion: boolean = false
  @Input() errorMessage: string = ""

  constructor(private router: Router, private cookieService: CookieService) {
  }

  public redirectionPage(): void {
    let payload: LastPagePayload = {
      url: this.router.url
    }
    this.cookieService.set("lastPage", JSON.stringify(payload))
  }
}
