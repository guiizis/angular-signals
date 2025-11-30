import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpContext } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";
import { Course } from "../models/course.model";
import { GetCoursesResponse } from "../models/get-courses.response";
import { SkipLoadingContext } from "../skip-loading/skip-loading.context";


@Injectable({
  providedIn: "root"
})
export class CoursesService {
  private readonly httpClient = inject(HttpClient);

  async loadAllCourses(): Promise<Course[]> {
    const courses$ = this.httpClient.get<GetCoursesResponse>(`${environment.apiRoot}/courses`, {
      context: new HttpContext().set(SkipLoadingContext, true)
    });
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const createdCourse$ = this.httpClient.post<Course>(`${environment.apiRoot}/courses`, course);
    const response = await firstValueFrom(createdCourse$);
    return response;
  }

  async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    const updateCourse$ = this.httpClient.put<Course>(`${environment.apiRoot}/courses/${courseId}`, changes);
    const response = await firstValueFrom(updateCourse$);
    return response;
  }

  async deleteCourse(courseId: string): Promise<Course> {
    const deletedCourse$ = this.httpClient.delete<Course>(`${environment.apiRoot}/courses/${courseId}`);
    const response = await firstValueFrom(deletedCourse$);
    return response;
  }
}
