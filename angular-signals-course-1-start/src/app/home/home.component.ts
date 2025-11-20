import { Component, computed, effect, inject, Injector, OnInit, signal } from '@angular/core';
import { CoursesService } from "../services/courses.service";
import { Course, sortCoursesBySeqNo } from "../models/course.model";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { MatDialog } from "@angular/material/dialog";
import { MessagesService } from "../messages/messages.service";
import { catchError, from, throwError } from "rxjs";
import { toObservable, toSignal, outputToObservable, outputFromObservable } from "@angular/core/rxjs-interop";
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

type Counter = {
  count: number
};

@Component({
  selector: 'home',
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly courseService = inject(CoursesService);
  private readonly courseServiceWithFetch = inject(CoursesServiceWithFetch);
  courses = signal<Course[]>([]);

  ngOnInit(): void {
    this.loadCourses();
  }

  async loadCourses() {
     this.courseServiceWithFetch.loadAllCourses()
     .then(allCourses => this.courses.set(allCourses))
     .catch(err => console.error("Error loading courses", err));
  }

}
