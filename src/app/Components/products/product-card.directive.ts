import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProductCard]'
})
export class ProductCardDirective {

  @Input() bgColor: string = ''; // Assuming 'bgColor' is passed as input

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Set initial background color if needed
    this.setBgColor(this.bgColor || 'transparent');
  }

  // Use ngOnChanges to react to changes in bgColor input
  ngOnChanges() {
    this.setBgColor(this.bgColor);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setShadow('10px 10px 20px rgba(0,0,0,0.5)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setShadow('5px 5px 10px rgba(0,0,0,0.3)');
  }

  private setBgColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  private setShadow(shadow: string) {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', shadow);
  }
}
