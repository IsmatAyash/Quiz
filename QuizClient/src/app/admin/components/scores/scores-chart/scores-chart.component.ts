import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);

@Component({
  selector: 'app-scores-chart',
  templateUrl: './scores-chart.component.html',
  styleUrls: ['./scores-chart.component.css']
})
export class ScoresChartComponent implements OnInit {
  chartOptions = {};
  Highcharts = Highcharts;
  @Input() data: any;
  @Input() qtrlabel;

  constructor() { }

  ngOnInit() {
    this.plotGauge();
  }

  plotGauge() {
    this.chartOptions = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            margin: 0
        },
        title: { text: null },
        pane: {
            startAngle: -160,
            endAngle: 160,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
        credits: {
          enabled: false
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'Q' + this.qtrlabel
            },
            plotBands: [{
                from: 0,
                to: 40,
                color: '#DF5353' // red
            }, {
                from: 40,
                to: 85,
                color: '#F5A742' // orange
            }, {
                from: 85,
                to: 100,
                color: '#55BF3B' // green
            }]
        },

        series: [{
            name: 'AvgGrade',
            data: this.data,
            tooltip: {
                valueSuffix: ' Q' + this.qtrlabel
            }
        }]

    };
  }

}
