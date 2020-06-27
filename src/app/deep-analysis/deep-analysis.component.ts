import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ChartComponent,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";
import { bindCallback } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
  xaxis: ApexXAxis;
  yaxis: ApexXAxis;
};
@Component({
  selector: 'app-deep-analysis',
  templateUrl: './deep-analysis.component.html',
  styleUrls: ['./deep-analysis.component.scss']
})

export class DeepAnalysisComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() { 
    this.chartOptions = {
      series: [
        {
          name: "Test-1",
          data: this.generateData(10,1, {
            min: 70,
            max: 100
          })
        },
        {
          name: "Test-2",
          data: this.generateData(10,2, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Test-3",
          data: this.generateData(10,3, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Test-4",
          data: this.generateData(10,4, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Test-5",
          data: this.generateData(10,5, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Test-6",
          data: this.generateData(10,6, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Test-7",
          data: this.generateData(10,7, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Test-8",
          data: this.generateData(10,8, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Test-9",
          data: this.generateData(10,9, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Test-10",
          data: this.generateData(10,10, {
            min: 0,
            max: 90
          })
        },
        
      ],
      chart: {
        height: 350,
        type: "heatmap"
        
            },
      dataLabels: {
        enabled: true,
      },
      colors: ["#008FFB"],
      title: {
        text: "BI Tests Correlations",
        style: {
          fontSize: '20px',
          color: "#000000",
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold'
                }
      },
      xaxis: {
        labels: {
          style: {
            colors: ["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
            fontSize: '15px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 1000,
            cssClass: 'apexcharts-xaxis-label'
        }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: ["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],
            fontSize: '15px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 1000,
            cssClass: 'apexcharts-xaxis-label'
        }
        }
      }
    };
  }
  
  // public generateData(count, yrange) {
  //   var i = 0;
  //   var series = [];
  //   // while (i < count) {
  //   //   var x = "Test- " + (i + 1).toString();
  //   //   var y =
  //   //     Math.floor((yrange.max - yrange.min + 1)) + yrange.min;

  //   series.push({
  //     x: "Test- 1",
  //     y: 5
  //   });
  //   series.push({
  //     x: "Test- 2",
  //     y: 2
  //   });
  //   series.push({
  //     x: "Test- 3",
  //     y: 
  //   });
  //     i++;
    
  //   return series;
  // }

  public generateData(count, row, yrange) {
    var i = 0;
    var series = [];
    var mat = [[0,0,0,0,0,0,0,0,0,0],
    [81,0,0,0,0,0,0,0,0,0],
    [25,33,0,0,0,0,0,0,0,0],
    [45,13,12,0,0,0,0,0,0,0],
    [50,30,20,26,0,0,0,0,0,0],
    [85,43,92,26,35,0,0,0,0,0],
    [15,43,52,26,45,14,0,0,0,0],
    [15,32,23,61,51,40,28,0,0,0],
    [53,82,22,16,95,14,32,22,0,0],
    [25,31,24,66,75,46,25,22,52,0]];
    while (i < count) {
      var x = "Test-" + (i + 1).toString();
      // var y =
      //   Math.floor((yrange.max - yrange.min + 1)) + yrange.min;
      var y = mat[row-1][i]

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
  ngOnInit(): void {
  }

}
