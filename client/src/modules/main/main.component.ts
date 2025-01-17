import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('login');
  }

  goToAdminPage() {
    this.router.navigate(['/admin']);
  }
}
