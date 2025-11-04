import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const value = localStorage.getItem("iLoveSalmon"); // fake data

  /* Simule un login à tester (On crée ou en supprime la clé "iLoveSalmon"  */
  localStorage.removeItem("iLoveSalmon");
  // OU
  //localStorage.setItem("iLoveSalmon", "true");

  console.log("Clé stockée :", localStorage.getItem("iLoveSalmon"));

  if (value) {
    console.log("✅ Accès autorisé à la page admin");
    return true;    // true au départ
  }

  router.navigate(["/error"]);
  console.log("⛔ Accès refusé — redirection vers /error");
  return false;     // false au départ
};






