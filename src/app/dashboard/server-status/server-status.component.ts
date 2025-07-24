import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  private interval?: ReturnType<typeof setInterval>;

  constructor() {
    effect(() => {
      console.log(this.currentStatus());
    });
  }

  ngOnInit() {
    console.log('ON INIT')
    this.interval = setInterval(() => {
      const rnd = Math.random(); // 0 - 0.999999999

      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);
  }

    ngAfterViewInit() {
      console.log('AFTER VIEW INIT');
    }
  
    ngOnDestroy() {
      clearTimeout(this.interval);
    }
}
