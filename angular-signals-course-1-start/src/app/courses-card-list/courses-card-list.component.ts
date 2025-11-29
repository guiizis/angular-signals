import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Course } from "../models/course.model";
import { MatDialog } from "@angular/material/dialog";
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'courses-card-list',
  imports: [
    RouterLink
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
  private readonly dialog = inject(MatDialog);

  public courseUpdate = output<Course>();
  public courseDelete = output<string>();
  public courses = input.required<Course[]>();

  async onEditCourse(course: Course): Promise<void> {
    const newCourse = await openEditCourseDialog(this.dialog, { mode: 'update', title: course.title, course });
    console.log('Edited course:', newCourse);

    this.courseUpdate.emit(newCourse);
  }

  onDeleteCourse(course: Course): void {
    this.courseDelete.emit(course.id);
  }
}
