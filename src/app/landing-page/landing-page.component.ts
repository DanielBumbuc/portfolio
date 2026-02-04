import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('marqueeContent', { static: false }) marqueeContent!: ElementRef;

  private animationId?: number;
  private currentPosition: number = 0;
  private speed: number = 1;
  private resizeTimeout?: number;
  repeats: number[] = [];

  constructor() {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.stopAnimation();
    this.resizeTimeout = window.setTimeout(() => {
      this.calcRepeats();
      setTimeout(() => this.startMarqueeAnimation(), 100);
    }, 200);
  }

  ngOnInit(): void {
    this.calcRepeats();
  }

  ngAfterViewInit(): void {
    this.startMarqueeAnimation();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  private startMarqueeAnimation(): void {
    if (!this.marqueeContent) return;

    const element = this.marqueeContent.nativeElement;
    const containerWidth = element.parentElement?.clientWidth || 0;
    const contentWidth = element.scrollWidth;

    console.log(containerWidth);

    const animate = () => {
      this.currentPosition -= this.speed;

      if (this.currentPosition <= -(contentWidth / this.repeats.length)) {
      this.currentPosition += (contentWidth / this.repeats.length);
    }

      element.style.transform = `translateX(${this.currentPosition}px)`;
      this.animationId = requestAnimationFrame(animate);
    }

    this.currentPosition = 0;
    this.animationId = requestAnimationFrame(animate);
  }

  private stopAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private restartAnimation(): void {
    this.stopAnimation();
    setTimeout(() => this.startMarqueeAnimation(), 100);
  }

  private calcRepeats(): void {
    const screenWidth = window.innerWidth;
    const repeatCount = Math.ceil(screenWidth / 400) + 2;
    this.repeats = Array(repeatCount).fill(0).map((_, i) => i);
  }
}
