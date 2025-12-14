import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../models/course.model";
import { EditCourseDialogData } from "./edit-course-dialog.data.model";
import { CoursesService } from "../services/courses.service";
import { LoadingIndicatorComponent } from "../loading/loading.component";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CourseCategoryComboboxComponent } from "../course-category-combobox/course-category-combobox.component";
import { CourseCategory } from "../models/course-category.model";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly coursesService = inject(CoursesService);
  private readonly fb = inject(FormBuilder);
  public readonly data: EditCourseDialogData = inject(MAT_DIALOG_DATA);
  public readonly category = signal<CourseCategory>(this.data.course?.category || 'BEGINNER');

  public readonly form = this.fb.group({
    title: [this.data.course?.title || ''],
    longDescription: [this.data.course?.longDescription || ''],
    category: [this.data.course?.category || ''],
    iconUrl: [this.data.course?.iconUrl || ''],
  });

  constructor() {
    effect(() => {
      console.log('Category changed to', this.category());
    });
  }


  ngOnInit() {
    this.form.patchValue({
      title: this.data.course?.title,
      longDescription: this.data.course?.longDescription,
      category: this.data.course?.category,
      iconUrl: this.data.course?.iconUrl,
    });
  }


  onCancel() {
    this.dialogRef.close();
  }

  async onSave() {
    const courseProps = this.form.value as Partial<Course>;
    courseProps.category = this.category();

    if (this.data.mode === 'update') {
      await this.saveCourse(this.data.course!.id, courseProps);
    }
    else if (this.data.mode === 'create') {
      await this.createCourse(courseProps);
    }
  }

  async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.coursesService.createCourse(course);
      this.dialogRef.close(newCourse);
    } catch(error) {
      console.error('Something went wrong while creating the course', error);
    }
  }

  async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      const savedCourse = await this.coursesService.saveCourse(courseId, changes);
      this.dialogRef.close(savedCourse);
    } catch (error) {
      console.error('Something went wrong while saving the course changes', error);
    }
  }

}

export async function openEditCourseDialog(dialog: MatDialog, course: EditCourseDialogData) {
  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.width = '400px';
  config.data = course;

  const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed();
  return firstValueFrom(close$);
}
