import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { KpiModel, DeptNameModel } from './KPI.model';
import { KPIService } from './KPI.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';



@Component({
  selector: 'app-KPI',
  templateUrl: './KPI.component.html',
  styleUrls: ['./KPI.component.css']
})
export class KPIComponent implements OnInit {

  data: KpiModel[];
  kpiMgtData: KpiModel[]=[];
  dataList: KpiModel[];
  dataListForFilter: KpiModel[]=[];
  value: boolean;
  deptname: DeptNameModel[];
  barChart: any;
  lineChart: any;
  label: any[] = [];
  target: any[] = [];
  actual: any[] = [];
  deptlist:DeptNameModel[]=[];
  selectedCity: any;
  barchartList:any[]=[];
  selectedMonth:any;
  selectedYear:any;
  selectedDept:any;
  showGraph = false;
  showReport = false;
  options:any;
  barchartoption: ChartOptions;
  barChartType: ChartType;
  barChartLegend:boolean;
  barChartData: ChartDataSets[] = []
  public chartOptions: ChartOptions = {
    //responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
     datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 10,
        }
     }
    },
    legend:{
      position:'top'
      //align:'end'
      
    }
  };
    public barChartPlugins = [ChartDataLabels];
  constructor(
    private kpiService: KPIService, private formBuilder: FormBuilder, chartModule: ChartModule,
    private cdRef: ChangeDetectorRef, private route: ActivatedRoute) {   }

  ngOnInit() {
    this.loadKpiReport();
    this.loadDeptName();
  }

  loadKpiReport() {
    this.kpiService.getAllKpi().subscribe(x => {
      this.data = x;
      this.dataList=x;
      var lookup = {};
      var items = this.data
     

      // for (var item, i = 0; item = items[i++];) {
      //   var name = item.MT_QK_KPI.DeptName;
      //      if (!(name in lookup)) {
      //     lookup[name] = 1;
      //     this.deptlist.push(name);
      //   }
      // }
   
      console.log(this.data);
      //console.log(this.deptlist);
    });
  }

  loadDeptName(){
    this.kpiService.getDeptName().subscribe(data => {
      this.deptlist = data; 
    })
  }
  onSelectMonth(event){
    this.selectedMonth = event.target.value; 
  }
  onSelectDpt(event){
 this.selectedDept = event.target.value;
  }
  onSelectYear(event){
    this.selectedYear = [];
    this.selectedYear = event.target.value;
  }
filterUnsuccessKPI(){
  this.dataList = [];
  this.dataList= this.dataListForFilter.filter(x=>(x.MT_QK_KPI.Target)-(+x.Actual)>0)
}
  filterKPI(){
    this.label = [];
    this.actual = [];
    this.dataList = [];
    this.dataListForFilter = [];
    this.target = [];
  
     this.kpiMgtData = this.data.filter(itm=>itm.MgtKPICheckedStatus== true);
     if(this.selectedDept== "KPI Management"){
      this.kpiMgtData.forEach(kpimg=>{
        if(kpimg.Month=== this.selectedMonth  && kpimg.Year == this.selectedYear ){
          this.actual.push(kpimg.Actual);
          this.label.push(kpimg.MT_QK_KPI.KpiName);
          this.target.push(kpimg.MT_QK_KPI.Target)
          this.dataList.push(kpimg);
          this.dataListForFilter.push(kpimg);
        }
       })
     }
    else{

      this.data.forEach(x => {
        if(x.Month=== this.selectedMonth && x.MT_QK_KPI.DeptId == this.selectedDept && x.Year == this.selectedYear ){
         this.actual.push(x.Actual);
         this.label.push(x.MT_QK_KPI.KpiName);
         this.target.push(x.MT_QK_KPI.Target)
         this.dataList.push(x);
         this.dataListForFilter.push(x);
       }
     });
    }
      this.loadLineChart(this.target, this.actual, this.label);
    this.showGraph = true;
    this.showReport= true;
  }
loadLineChart(target: any[], actual: any[], label: any[]){
  var target1 = target.map(v => parseInt(v, 10));
  var actual1 = actual.map(v => parseInt(v, 10));
  this.barChart = {
    labels: label,
    datasets: [
      {
        label: 'Target',
        data: target1,
        backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
      },
      {
        label: 'Actual',
        data: actual1,
        backgroundColor: '#9CCC65',
        borderColor: '#7CB342',
        
      }
    ],
  }
}
}


