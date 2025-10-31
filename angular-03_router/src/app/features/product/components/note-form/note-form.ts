import {Component, inject, input, output} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NoteFormModel} from '../../models/note-form.model';

@Component({
  selector: 'app-note-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './note-form.html',
  styleUrl: './note-form.scss'
})
export class NoteForm {
  id = input.required<number>()
  private fb = inject(NonNullableFormBuilder);

  noteForm: FormGroup<NoteFormModel> = this.fb.group({
    note: this.fb.control(0, [Validators.required]),
  });
  submitNote= output<{id: number, rating: number }>()

  onSubmit() {
    console.log(this.noteForm.value);
    this.submitNote.emit({id: this.id(), rating: this.noteForm.value.note ?? 0})
    //this.addNoteAlert.emit([this.noteForm.value, this.product()]);
  }
}
