import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";

@Component({
    selector: 'lessons',
    imports: [
        LessonDetailComponent
    ],
    templateUrl: './lessons.component.html',
    styleUrl: './lessons.component.scss'
})
export class LessonsComponent {
  private readonly lessonService = inject(LessonsService);
  public readonly mode = signal<'master' | 'detail'>('master');
  public readonly lessons = signal<Lesson[]>([]);
  public readonly selectedLesson = signal<Lesson | null>(null);

  onSearchLesson() {

  }
}
