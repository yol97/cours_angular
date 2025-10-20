// counter.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.html',
  styleUrls: ['./counter.scss']
})
export class Counter {
  // Création du signal
  count = signal(0);

  // Écriture avec update() - basé sur la valeur actuelle
  increment(): void {
    this.count.update(current => current + 1);
  }

  // Écriture avec update() - basé sur la valeur actuelle
  decrement(): void {
    this.count.update(current => current - 1);
  }

  // Écriture avec set() - valeur directe, on y va comme un phacochère 🐗
  reset(): void {
    this.count.set(0);
  }
}
