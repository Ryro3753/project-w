import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/common/alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger(
      'newAlert', [
        transition(':enter', [
          style({transform: 'translateX(100%)'}),
          animate('300ms', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0%)'}),
          animate('300ms', style({transform: 'translateX(100%)'}))
        ])
      ]),
  ]
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];
  private subscription!: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getObservable().subscribe(alert => this.addAlert(alert));
  }

  private addAlert(alert: Alert) {
    this.alerts.push(alert);
    setTimeout(() => { this.close(alert) }, alert.alertInfo.timeout);
  }

  close(alert: Alert) {
    this.alerts = this.alerts.filter(al => al.alertInfo.id !== alert.alertInfo.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
