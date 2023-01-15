import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { CharacterClass } from 'src/app/models/class.model';
import { User } from 'src/app/models/common/user.model';
import { ClassService } from 'src/app/services/class.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styleUrls: ['./class-page.component.css']
})
export class ClassPageComponent implements OnInit,OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
              readonly classService: ClassService,
              readonly alertService: AlertService) { }

  currentUser: User | undefined;

  classes!: CharacterClass[];

  ngOnInit(): void {
    this.subscribes.push(this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user) {
        await this.readData(i.user.Id);
      }
    }));
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  async readData(userId: string){
    this.classes = await this.classService.getAllClassesByUserId(userId);
  }

  async addNewClass() {
    if (this.currentUser && this.classes) {
      const newClass = await this.classService.insertClass({ UserId: this.currentUser.Id });
      this.classes.unshift(newClass);
    }
  }

  async deleteClass(classId: number) {
    if (!this.currentUser)
      return;

    const result = await this.classService.deleteClass(classId, this.currentUser.Id);
    if (result == true && this.classes) {
      this.classes = this.classes.filter(i => i.Id != classId);
    }
    else {
      const error = result as any;
      this.alertService.alert({ alertInfo: { message: error.error, type: 'warning', timeout: 5000 } })
    }
  }

}
