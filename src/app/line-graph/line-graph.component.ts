import { Component, Input, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {

  @Input() lineGraphData: any;
  constructor() { }
  ngOnInit(): void {
    this.lineGraph();
  }
  lineGraph() {
    if (this.lineGraphData) {
      const root = am5.Root.new("lineDiv");
      root.setThemes([am5themes_Animated.new(root)]);
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          panX:false,
          layout: root.verticalLayout,
          cursor:am5xy.XYCursor.new(root,{})
        })
      );

    const data = [
        {
          category: "Mark1",
          value: JSON.parse(this.lineGraphData.mark1)
        },
        {
          category: "Mark2",
          value: JSON.parse(this.lineGraphData.mark2)
        },
        {
          category: "Mark3",
          value: JSON.parse(this.lineGraphData.mark3)
        },
        {
          category: "Mark4",
          value: JSON.parse(this.lineGraphData.mark4)
        }
      ];
      const yAxis = chart.yAxes.push(                                // Creating Y-axis
        am5xy.ValueAxis.new(root, {
          min: 10,
          max: 100,
          ariaLabel:"Marks",
          renderer: am5xy.AxisRendererY.new(root, {
          })
        })
      );
    const label1 = am5.Label.new(root, {
        rotation: -90,
        text: "Marks-->",
        y: am5.p50,
        centerX: am5.p50
      })
      yAxis.children.unshift(
        label1
      );
      const xAxis = chart.xAxes.push(                               // Creating X-Axis
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, { 
          }),
          categoryField: "category",
        })
      );
      yAxis.get("renderer").grid.template.setAll({
        strokeWidth: 0,
        visible:false,
      }); 
      xAxis.get("renderer").grid.template.setAll({
        location: -3,
        strokeWidth: 0,
        visible:true,
      });
      xAxis.data.setAll(data);
      const series = chart.series.push(                             // Creating series
        am5xy.LineSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          //alignLabels: false,
          categoryXField: "category",
          stroke: am5.color("#d9b45d"),
          fill: am5.color("#d9b45d"),
          tooltip: am5.Tooltip.new(root, {
            keepTargetHover: true,
            pointerOrientation: "down",
            labelText: "{categoryX}:{valueY}"
          })
        })
      );
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 3,
            stroke:series.get("fill"),
            strokeWidth:2,
            fill:  am5.color( 0xff0000)
          })
        });
      });
      series.data.setAll(data);
      series.appear(1000);
      chart.appear(1000, 100);

      var exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
      
        dataSource:data,
      });
    }
  }
}