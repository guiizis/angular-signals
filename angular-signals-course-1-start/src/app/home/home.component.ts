import { Component, computed, effect, inject, Injector, OnInit, signal, viewChild } from '@angular/core';
import { CoursesService } from "../services/courses.service";
import { Course, sortCoursesBySeqNo } from "../models/course.model";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { MatDialog } from "@angular/material/dialog";
import { MessagesService } from "../messages/messages.service";
import { catchError, from, throwError } from "rxjs";
import { toObservable, toSignal, outputToObservable, outputFromObservable } from "@angular/core/rxjs-interop";
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';
import { JsonPipe } from '@angular/common';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'home',
  imports: [
    MatTabGroup,
    MatTab,
    JsonPipe,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly courseService = inject(CoursesService);
  private readonly dialog = inject(MatDialog);
  private readonly messagesService = inject(MessagesService);
  private readonly beginnerList = viewChild.required<CoursesCardListComponent>('beginnersList');

  #courses = signal<Course[]>([]);

  beginnerCourses = computed(() => {
    const courses = this.#courses();
    const beginners = courses.filter(c => c.category === "BEGINNER");
    return beginners.sort(sortCoursesBySeqNo);
  });

  advancedCourses = computed(() => {
    const courses = this.#courses();
    const advanced = courses.filter(c => c.category === "ADVANCED");
    return advanced.sort(sortCoursesBySeqNo);
  });

  ngOnInit(): void {
    this.loadAllCourses();
  }

  async loadAllCourses() {
    this.courseService.loadAllCourses()
      .then(allCourses => this.#courses.set(allCourses))
      .catch(err => {
        this.messagesService.showMessage("Could not load courses", "error");
        console.error("Error loading courses", err)
      })
  }

  onCourseUpdate(course: Course) {
    const courses = this.#courses();
    const newCourses = courses.map(courseItem => courseItem.id === course.id ? course : courseItem);
    this.#courses.set(newCourses);
  }

  async onCourseDelete(courseId: string) {
    try {
      await this.courseService.deleteCourse(courseId);
      const courses = this.#courses();
      const newCourses = courses.filter(courseItem => courseItem.id !== courseId);
      this.#courses.set(newCourses);
    } catch (error) {
      console.error("Error deleting course", error);
    }
  }

  async onAddCourse() {
    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: 'create',
      title: 'add a new course'
    });

    if (!newCourse) {
      return;
    }

    const courses = this.#courses();
    const allCourses = [...courses, newCourse];

    this.#courses.set(allCourses);
  }
}
