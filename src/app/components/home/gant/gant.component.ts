import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};
@Component({
  selector: 'app-gant',
  templateUrl: './gant.component.html',
  styleUrls: ['./gant.component.css']
})

export class GantComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {
    this.chartOptions = {
      series: [
        {
          data: [
            {
              x: "Incidencias",
              y: [
                new Date("2023-10-15").getTime(),
                new Date("2023-10-17").getTime()
              ]
            },
            {
              x: "Ventas",
              y: [
                new Date("2023-10-18").getTime(),
                new Date("2023-10-20").getTime()
              ]
            },
            {
              x: "Desarrollo",
              y: [
                new Date("2023-10-21").getTime(),
                new Date("2023-10-23").getTime()
              ]
            },
            {
              x: "Marketing",
              y: [
                new Date("2023-10-24").getTime(),
                new Date("2023-10-26").getTime()
              ]
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: "datetime"
      }
    };
  }

  ngOnInit(): void {
  }

}
