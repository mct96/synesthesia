import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class PlotConsumer {
    public constructor(private http: HttpClient) {

    }

    private getPath(): string {
        return environment.apiUrl;
    }

    public post(format: "spec"|"wav", body: FormData): Observable<Blob> {
        const headers = new HttpHeaders()
            .append("Content-Type", "multipart/form-data")
            .append("enctype", "multipart/form-data");

        const params = new HttpParams()
            .append("graphic-type", format);

        const path = `${this.getPath()}`;
        return this.http.post<Blob>(path, body, {
            params: params,
            responseType:"blob" as "json",
            reportProgress: true,
        });
    }
}