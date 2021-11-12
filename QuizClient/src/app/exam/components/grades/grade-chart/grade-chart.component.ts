import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-grade-chart',
  templateUrl: './grade-chart.component.html',
  styleUrls: ['./grade-chart.component.css']
})
export class GradeChartComponent implements OnInit {
  @Input() categories: string [] = [];
  @Input() data: any = [];

  chartOptions: {};
  Highcharts = Highcharts;

  constructor() { }

  ngOnInit() {
      this.plotChart();
  }

  plotChart() {
    this.chartOptions = {
      chart: {
          type: 'spline',
          borderwidth: 0,
          events: {
            load() {
              const chart = this;
              const points = chart.series[0].points;
              let maxValue = 0;
              let chosenPoint;

              points.forEach((point, index) => {
                if (!maxValue || maxValue < point.y) {
                  maxValue = point.y;
                  chosenPoint = point;
                }
              });
              chosenPoint.update({
                marker: { symbol: 'url(assets/img/HighGrade.png)' }
              });
            }
          }
      },
      title: {
          text: 'Quarterly Average Grades'
      },
      xAxis: {
          categories: this.categories,
          labels: {
            style: {
              fontSize: 12,
              fontWeight: 'bold'
            }
          }
      },
      yAxis: {
          title: {
            enabled: false
          },
          labels: {
            enabled: false
          }
      },
      tooltip: {
          crosshairs: true,
          shared: true
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            },
            dataLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold',
                fontSize: 12
              }
            },
          }
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      series: [{
        color: '#382aa8',
          marker: {
              symbol: 'square'
          },
          data: this.data
      }]
    };
    HC_exporting(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
