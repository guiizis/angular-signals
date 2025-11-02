import { Component, computed, effect, inject, Injector, OnInit, signal } from '@angular/core';
import { CoursesService } from "../services/courses.service";
import { Course, sortCoursesBySeqNo } from "../models/course.model";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { MatDialog } from "@angular/material/dialog";
import { MessagesService } from "../messages/messages.service";
import { catchError, from, throwError } from "rxjs";
import { toObservable, toSignal, outputToObservable, outputFromObservable } from "@angular/core/rxjs-interop";

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
export class HomeComponent implements OnInit {
  counter = signal<Counter>({ count: 0 });
  values = signal<number[]>([1, 2, 3]);
  injector = inject(Injector);

  tenXCounter = computed(() => {
    const current = this.counter();
    return current.count * 10;
  });

  hundredXCounter = computed(() => {
    const current = this.tenXCounter();
    return current * 100;
  });

  ngOnInit(): void {
    effect(() => {
      console.log('Counter changed:', this.counter());
    }, {
      injector: this.injector
    });
  }

  append(): void {
    this.values.update(vs => [...vs, vs.length + 1])
  }

  incrementCounter() {
    this.counter.update(c => ({
      ...c,
      count: c.count + 1
    }));
  }

}
