import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';


export const guardcatsGuard: CanActivateFn = (route, state) => {
  if(inject(UserService).currentUser != null){
    if(inject(UserService).currentUser?.prefercat == true){
          return true; 
      }
      else {return createUrlTreeFromSnapshot(route, ["/dog"])}
  }
  else {
      console.log("utilisateur non logde in");
      return createUrlTreeFromSnapshot(route, ["/login"])
    }
};
