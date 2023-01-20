import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Sort } from './Sort';

@Directive({
  selector: '[appSorting]'
})
export class SortingDirective {

  @Input() appSorting: Array<any>;
  constructor(private render: Renderer2, private elementRef: ElementRef) {
    this.appSorting = [];
  }
  @HostListener("click")
  sortData() {
    const sort = new Sort();
    const element = this.elementRef.nativeElement;
    const order = element.getAttribute("data-order");
    const type = element.getAttribute("data-type");
    const property = element.getAttribute("data-name");
    if (order === "desc") {
      this.appSorting.sort(sort.startSort(property, order, type));
      element.setAttribute("data-order", "asc");
    }
    else {
      this.appSorting.sort(sort.startSort(property, order, type));
      element.setAttribute("data-order", "desc");
    }
  }
}
