import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Toast } from './shared/notifications/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.router.navigate(['/login']);
    }
  }
}
