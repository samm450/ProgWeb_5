import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { User } from './user';
import { UserService } from './user.service';

export const petGuard69Guard: CanActivateFn = (route, state) => {
  if(inject(UserService).currentUser != null){
     return true

  }
  else {
    console.log("ca marche");
    return createUrlTreeFromSnapshot(route, ["/login"]) 
  }
}

