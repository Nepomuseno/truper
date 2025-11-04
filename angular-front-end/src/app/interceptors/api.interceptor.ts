import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // 🔹 Continuamos con la petición y manejamos errores
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = "Ocurrió un error inesperado.";

        if (error.status === 0) {
          message = "No hay conexión con el servidor.";
        } else if (error.status === 404) {
          message = "Recurso no encontrado.";
        } else if (error.status >= 500) {
          message = "Error interno del servidor.";
        }

        console.error("🚨 Error HTTP:", {
          url: req.url,
          status: error.status,
          message: error.message,
        });

        return throwError(() => new Error(message));
      })
    );
  }
}
