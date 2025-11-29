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
  public readonly data: EditCourseDialogData = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  public readonly form = this.fb.group({
    title: [this.data.course?.title || ''],
    longDescription: [this.data.course?.longDescription || ''],
    category: [this.data.course?.category || ''],
    iconUrl: [this.data.course?.iconUrl || ''],
  });

  private readonly coursesService = inject(CoursesService);

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

    if (this.data.mode === 'update') {
      await this.saveCourse(this.data.course!.id, courseProps);
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
