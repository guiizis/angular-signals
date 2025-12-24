import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";
import { MessagesService } from '../messages/messages.service';

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
  private readonly messageService = inject(MessagesService);
  private readonly searchInputRef = viewChild.required<ElementRef>('search');
  public readonly mode = signal<'master' | 'detail'>('master');
  public readonly lessons = signal<Lesson[]>([]);
  public readonly selectedLesson = signal<Lesson | null>(null);

  async onSearchLesson() {
    const query = this.searchInputRef().nativeElement.value;

    const results = await this.lessonService.loadLessons({query});

    this.lessons.set(results);
  }

  onLessonUpdated(lesson: Lesson) {
    this.lessons.update(lessons => lessons.map(l => l.id === lesson.id ? lesson: l))
  }

  onLessonSelected(lesson: Lesson) {
    this.mode.set('detail');
    this.selectedLesson.set(lesson);
  }

  onCancel() {
    this.mode.set('master');
  }
}
