import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appNotImage]",
})
export class NotImageDirective {
  @Input() img!: string;

  constructor(private elementImg: ElementRef) {}

  @HostListener("error")
  onError() {
    this.elementImg.nativeElement.src = this.img;
  }
}
