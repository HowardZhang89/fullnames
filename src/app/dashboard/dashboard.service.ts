import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ReflectionCapabilities } from '@angular/core/src/reflection/reflection_capabilities';
import { of } from 'rxjs';


@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  tmpArray: any[];
  
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ){
      this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  addNameToSearchHistory(fName: string, lName: string){
    this.searchHistoryRef.push({firstName: fName, lastName: lName});
  }

  searchName(fName: string, lName : string){
    // create observable that watches if names match
    var refFirst = this.db.object(`names/last-names/${fName}`).snapshotChanges();
    var refLast = this.db.object(`names/last-names/${fName}`).snapshotChanges();
    return refFirst.switchMap( fNameMatch => 
        refLast.switchMap(lNameMatch => {
          return of((fNameMatch.payload.val() === true) && (lNameMatch.payload.val()===true));
      })
    );
  }

  addNameToDatabase(fName: string, lName: string){
    this.db.list('names/first-names').set(fName, true);
    this.db.list('names/last-names').set(lName, true);
  }

  


}
