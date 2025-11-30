import { HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { LoadingService } from "../loading/loading.service";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { SkipLoadingContext } from "../skip-loading/skip-loading.context";

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if(req.context.get(SkipLoadingContext)) {
    return next(req);
  }

  const loadingService = inject(LoadingService);

  loadingService.loadingOn();

  return next(req)
    .pipe(
      finalize(() => loadingService.loadingOf())
    )
}
