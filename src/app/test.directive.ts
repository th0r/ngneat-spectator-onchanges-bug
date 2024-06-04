import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appTest]',
  standalone: true
})
export class TestDirective implements OnChanges {
  @Input('appTest') value: string;

  constructor(private elemRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.elemRef.nativeElement.setAttribute('data-test', this.value);
    }
  }
}
