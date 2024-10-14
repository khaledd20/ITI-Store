import { ProductCardDirective } from './product-card.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('ProductCardDirective', () => {
  let directive: ProductCardDirective;
  let mockElementRef: ElementRef;
  let renderer2: Renderer2;

  beforeEach(() => {
    // Mocking ElementRef and Renderer2
    mockElementRef = new ElementRef(document.createElement('div'));

    renderer2 = jasmine.createSpyObj('Renderer2', [
      'setStyle', // Mock the methods used in the directive
      'removeStyle',
      'addClass',
      'removeClass'
    ]);

    directive = new ProductCardDirective(mockElementRef, renderer2);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set background color on init', () => {
    directive.bgColor = 'yellow';
    directive.ngOnChanges();
    
    // Expect that the setStyle method has been called with correct arguments
    expect(renderer2.setStyle).toHaveBeenCalledWith(
      mockElementRef.nativeElement,
      'background-color',
      'yellow'
    );
  });

  // More tests...
});
