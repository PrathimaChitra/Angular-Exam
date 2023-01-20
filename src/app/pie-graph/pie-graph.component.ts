import { Component, Input, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.scss']
})
export class PieGraphComponent implements OnInit {

  @Input() pieChart: any;
  constructor() { }
  ngOnInit(): void {
    this.pieGraph();
  }
  pieGraph(): void {
    console.log(this.pieChart);
    if (this.pieChart) {
      const root = am5.Root.new("pieChartDiv");
      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout
        })
      )
      const data = [
        {
          category: "Mark1",
          value: JSON.parse(this.pieChart.mark1)
        },
        {
          category: "Mark2",
          value: JSON.parse(this.pieChart.mark2)
        },
        {
          category: "Mark3",
          value: JSON.parse(this.pieChart.mark3)
        },
        {
          category: "Mark4",
          value: JSON.parse(this.pieChart.mark4)
        }
      ];
      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "value",
          categoryField: "category",
          startAngle: 360,
          endAngle: 0,
          alignLabels: false,
          tooltip: am5.Tooltip.new(root, {})
        })
      );
      series.labels.template.set("text", "{category}");
      series.slices.template.set("tooltipText", "{category} :{value}");
      series.data.setAll(data);
      series.appear();
      chart.appear();

      var exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
      
        dataSource:data,
      });
    }
  }
}
