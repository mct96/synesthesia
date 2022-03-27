import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PlotConsumer } from 'src/consumer/plot.consumer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'music';
  specImage: any;
  wavImage: any;
  filename: string = "";
  loading: boolean = false;

  public constructor(private plotConsumer: PlotConsumer) {

  }

  createImageFromBlob(image: Blob, type: string) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
     if (type=="spec")
        this.specImage = reader.result;
      else
        this.wavImage = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}

  public handleFile($event: any): void {
    const file = $event.target.files[0];
    const formData = new FormData();
    formData.append("music", file, file.name);
    this.filename = file.name;

    this.loading = true;
    forkJoin([
      this.plotConsumer.post("spec", formData),
      this.plotConsumer.post("wav", formData)
    ]).subscribe({
      next: responses => {
        this.createImageFromBlob(responses[0], "spec");
        this.createImageFromBlob(responses[1], "wav");
      },
      complete: () => this.loading = false,
    });
  }

  public reset(): void {
    this.specImage = null;
    this.wavImage = null;
    this.filename = "";
  }

  public isLoading(): boolean {
    return this.loading;
  }
}


