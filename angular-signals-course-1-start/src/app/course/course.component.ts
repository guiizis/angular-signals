import { Component, inject, OnInit, signal } from '@angular/core';
import { Course } from '../models/course.model';
import { Lesson } from '../models/lesson.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly course = signal<Course | null>(null);
  public readonly lessons = signal<Lesson[] | null>(null);

  ngOnInit(): void {
    this.course.set(this.activatedRoute.snapshot.data['course']);
    this.lessons.set(this.activatedRoute.snapshot.data['lessons']);
  }
}
