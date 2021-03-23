import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChartsComponent } from "./charts.component";
import { EchartsComponent } from "./echarts/echarts.component";
import { D3Component } from "./d3/d3.component";
import { ChartjsComponent } from "./chartjs/chartjs.component";
import { PostesResolver } from "app/@core/resolver";

const routes: Routes = [
  {
    path: "",
    component: ChartsComponent,
    children: [
      {
        path: "",
        redirectTo: 'chartjs',
      },
      {
        path: "echarts",
        component: EchartsComponent,
      },
      {
        path: "d3",
        component: D3Component,
      },
      {
        path: "chartjs",
        component: ChartjsComponent,
        resolve: {
          postes: PostesResolver,
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}

export const routedComponents = [
  ChartsComponent,
  EchartsComponent,
  D3Component,
  ChartjsComponent,
];
