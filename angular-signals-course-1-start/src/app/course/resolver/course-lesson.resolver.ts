import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Lesson } from "../../models/lesson.model";
import { inject } from "@angular/core";
import { LessonsService } from "../../services/lessons.service";

export const courseLessonResolver: ResolveFn<Lesson[] | null> = async(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const lessonService = inject(LessonsService);
  const courseId = route.paramMap.get('courseId');

  if(!courseId) {
    return [];
  }

  return lessonService.loadLessons({courseId});
}
