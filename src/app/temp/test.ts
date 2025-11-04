import { Component, signal, effect } from '@angular/core';

const count = signal(0);
const user = signal('Alice');

// Effect : s'exécute automatiquement quand count ou user changent
effect(() => {
  console.log(`${user()} a cliqué ${count()} fois`);

  // Effet de bord : sauvegarder en localStorage
  localStorage.setItem('userStats', JSON.stringify({
    user: user(),
    clicks: count()
  }));
});

count.set(5); // → Console: "Alice a cliqué 5 fois" + sauvegarde localStorage
user.set('Bob'); // → Console: "Bob a cliqué 5 fois" + sauvegarde localStorage

// L'effect surveille automatiquement tous les signals utilisés à l'intérieur
