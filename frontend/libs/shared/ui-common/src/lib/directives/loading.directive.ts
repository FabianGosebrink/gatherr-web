import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';

@Directive({ selector: '[workspaceIsLoading]' })
export class IsLoadingDirective implements OnChanges {
  @Input('workspaceIsLoading') isLoading = false;
  @Input() loadingText = 'Loading...';
  @Input() buttonText = '';
  private buttonLoading = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    changes.isLoading.currentValue ? this.showLoading() : this.removeLoading();
  }

  private showLoading() {
    this.setDisabledAttribute();
    this.resetText();
    this.addSpinner();
    this.setCursor('not-allowed');
    this.showText(this.loadingText);
  }

  private removeLoading() {
    this.removeDisabledAttribute();
    this.resetText();
    this.removeSpinner();
    this.setCursor('default');
    this.showText(this.buttonText);
  }

  private addSpinner() {
    const child = this.document.createElement(`span`);
    child.classList.add('spinner-border', 'spinner-border-sm', 'mr-2');
    child.setAttribute('role', 'status');
    child.setAttribute('aria-hidden', 'true');
    this.renderer.appendChild(this.elementRef.nativeElement, child);
  }

  private showText(textToShow: string) {
    const text = this.renderer.createText(textToShow);
    this.renderer.appendChild(this.elementRef.nativeElement, text);
  }

  private removeSpinner() {
    const spinnerSpan = this.elementRef.nativeElement.querySelector('span');
    if (!spinnerSpan) {
      return;
    }

    this.renderer.removeChild(this.elementRef.nativeElement, spinnerSpan);
  }

  private resetText() {
    this.elementRef.nativeElement.innerHTML = '';
  }

  private setDisabledAttribute() {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'disabled',
      'true'
    );
    this.buttonLoading = true;
  }

  private removeDisabledAttribute() {
    if (this.buttonLoading) {
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
      this.buttonLoading = false;
    }
  }

  private setCursor(value: string) {
    this.elementRef.nativeElement.style.cursor = value; // ;
  }
}
