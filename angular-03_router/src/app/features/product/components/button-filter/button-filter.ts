import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-button-filter',
  imports: [],
  templateUrl: './button-filter.html',
  styleUrl: './button-filter.scss'
})
export class ButtonFilter {
  categories = ['clothing', 'gaming', 'home', '']; // '' = reset
  active = input.required<string>();
  changeCategory = output<string>()

  onClick(category: string) {
    this.changeCategory.emit(category)
  }
}
