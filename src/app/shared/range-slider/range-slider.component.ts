import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

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
  @Input() rangeMax: number;
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
  sliderBackground = '';
  @Output() rangeChange = new EventEmitter<RangeEvent>();

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
    this.fillColour();

  }

  update() {
    var minvalue = Math.floor(this.minValue);
    var maxvalue = Math.floor(this.maxValue);
    var avgvalue = Math.floor((minvalue + maxvalue) / 2);

    this.draw(avgvalue);
    this.fillColour();
  }
  fillColour() {
    var minvalue = this.minValue;
    var maxvalue = this.maxValue;
    console.log(this.rangeMax)
    console.log(this.minValue)

    // let percent1 = (minvalue / this.maxOfMin) * 100;
    let percent1 =
      (this.minValue / (this.rangeMax + this.rangeMax * 0.1)) * 100;
    let percent2 =
      ((this.maxValue + this.rangeMax * 0.1) /
        (this.rangeMax + this.rangeMax * 0.1)) *
      100;
    // this.sliderLeft= percent1 + '%'
    // this.sliderRight= percent2 + '%'
    this.sliderBackground = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
    // percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    // sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
  }

  rangeChangeEvent(){
    let objRangeEvent: RangeEvent = new RangeEvent();
    objRangeEvent.rangeMinValue = this.minValue;
    objRangeEvent.rangeMaxValue = this.maxValue;
    this.rangeChange.emit(objRangeEvent);
  }

}

export class RangeEvent{
  rangeMinValue: number;
  rangeMaxValue: number;
}
