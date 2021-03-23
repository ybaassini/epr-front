import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbThemeService, NbColorHelper } from "@nebular/theme";
import { ConstatManagementService } from "app/@core/services/constat-management.service";

@Component({
  selector: "ngx-chartjs-bar",
  template: ` <chart type="bar" [data]="data" [options]="options"></chart> `,
})
export class ChartjsBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  constats;

  constructor(
    private theme: NbThemeService,
    private route: ActivatedRoute,
    private constatManagementService: ConstatManagementService
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.route.data.subscribe((data) => {
        this.constats = this.constatManagementService.groupByZoneAndStatus(
          data.postes.data,
        );
      });
      this.data = {
        labels: this.constats.map(constat => constat.label),
        datasets: [
          {
            data: this.constats.map(constat => constat.inProgress),
            label: "En cours",
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
          },
          {
            data: this.constats.map(constat => constat.solde),
            label: "Soldés",
            backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
          },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
