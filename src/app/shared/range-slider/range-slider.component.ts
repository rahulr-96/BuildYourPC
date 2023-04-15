import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rangeSlider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css'],
})
export class RangeSliderComponent implements OnInit {
  @ViewChild('slider', { static: true })
  public slider: ElementRef;
  name = 'Angular';
  rangeMin: number = 0;
  rangeMax: number = 3000;
  thumbsize: number = 14;
  minValue: number;
  maxValue: number;
  maxOfMin: number;
  minOfMax: number;
  minStyleWidth: string;
  maxStyleWidth: string;
  minStyleLeft: string;
  maxStyleLeft: string;
  minStyleTop: string;
  maxStyleTop: string;
  rangeWidth: number = 200;
  ngOnInit() {
    this.init();
  }

  draw(splitvalue: number) {
    var thumbsize = this.thumbsize;
    var rangewidth = this.rangeWidth;
    var rangemin = this.rangeMin;
    var rangemax = this.rangeMax;

    this.maxOfMin = splitvalue;
    this.minOfMax = splitvalue;

    this.minStyleWidth =
      (
        thumbsize +
        ((splitvalue - rangemin) / (rangemax - rangemin)) *
          (rangewidth - 2 * thumbsize)
      ).toString() + 'px';

    this.maxStyleWidth =
      (
        thumbsize +
        ((rangemax - splitvalue) / (rangemax - rangemin)) *
          (rangewidth - 2 * thumbsize)
      ).toString() + 'px';

    this.minStyleLeft = '0px';
    this.maxStyleLeft = parseInt(this.minStyleWidth) + 'px';
    if (this.maxValue > rangemax - 1) this.maxValue = rangemax;
  }

  init() {
    var rangemin = this.rangeMin;
    var rangemax = this.rangeMax;
    var avgvalue = (rangemin + rangemax) / 2;

    this.minValue = rangemin;
    this.maxValue = rangemax;

    this.draw(avgvalue);

  }

  update() {
    var minvalue = Math.floor(this.minValue);
    var maxvalue = Math.floor(this.maxValue);
    var avgvalue = Math.floor((minvalue + maxvalue) / 2);

    this.draw(avgvalue);
  }
}
