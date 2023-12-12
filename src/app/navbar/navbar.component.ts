import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageFirebase } from '../shared/data-storage-firebase.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit, OnDestroy {
  constructor(private data: DataStorageFirebase,
              private authService: AuthService,
              private router: Router){}
  isAuthenticated = false;
  private userSub!: Subscription;

  ngOnInit(): void {
     this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user;

     }
     );
  }
  getData(){
    this.data.storePets();
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login'])

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
}


}
