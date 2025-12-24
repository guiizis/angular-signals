import { Component, inject, input, output } from '@angular/core';
import { Lesson } from "../../models/lesson.model";
import { ReactiveFormsModule } from "@angular/forms";
import { LessonsService } from "../../services/lessons.service";
import { MessagesService } from "../../messages/messages.service";

@Component({
  selector: 'lesson-detail',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {
  private readonly lessonsService = inject(LessonsService);
  public readonly lesson = input.required<Lesson | null>();
  public readonly lessonUpdated = output<Lesson>();
  public readonly cancel = output();

  onCancel() {
    this.cancel.emit();
  }

  async onSaveLesson(lessonDescription: string) {
    console.log(lessonDescription);

    try {
      const updatedLesson = await this.lessonsService.saveLesson(this.lesson()!.id, { description: this.lesson()!.description });
      this.lessonUpdated.emit(updatedLesson);
    } catch (error) {
      console.error('Error saving lesson', error);
    }
  }
}
