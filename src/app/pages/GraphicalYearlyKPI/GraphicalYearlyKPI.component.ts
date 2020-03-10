import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { KpiGraphicalModel, DeptNameGraphicalModel,KeyModel } from './GraphicalYearlyKPI.model';
import { GraphicalKPIService } from './GraphicalYearlyKPI.service';
import { KpiModel } from '../KPI/KPI.model';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import plugin from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-GraphicalYearlyKPI',
  templateUrl: './GraphicalYearlyKPI.component.html',
  styleUrls: ['./GraphicalYearlyKPI.component.css']
})
export class GraphicalKPIComponent implements OnInit {

  data: KpiGraphicalModel[];
  dataList: KpiGraphicalModel[];
  value: boolean;
  deptname: DeptNameGraphicalModel[];
  barChart: any;
  lineChart: any;
  lineChartDeptWise: any;
  label: any[] = [];
  target: any[] = [];
  actual: any[] = [];
  deptDropDownList:any[]=[];
  deptlist:any[]=[];
  selectedCity: any;
  barchartList:any[]=[];
  selectedYear:any;
  selectedDept:any;
  allKPIWiseList:any[]=[];
  keyModel:KeyModel[]=[];
  keyModelNew:KeyModel[]=[];
  lineChartList:any[]=[];
  showalldeptwise=false;
  AllItems =[];
  monthList =[];
  qc=[];
  kpiList =[];
  isShowMessage = false;
  options:any;
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
    }
  };
    public barChartPlugins = [ChartDataLabels];

  constructor(
    private graphicalKPIService: GraphicalKPIService, private formBuilder: FormBuilder, chartModule: ChartModule,
    private cdRef: ChangeDetectorRef, private route: ActivatedRoute) {

   
  }

  ngOnInit() {
    this.loadGraphicalKpiReport();
  }

  loadGraphicalKpiReport() {
    this.graphicalKPIService.getKpi().subscribe(x => {
      this.data = x;
      this.dataList=x;
      console.log(this.data);
      this.getPivotData(x);
      this.data.forEach(x => {

        this.target.push(x.Target);
        this.actual.push(x.April); 
        //this.actual.push(x.Actual);      
        this.label.push(x.CWQPNo);
        //this.label.push(x.KpiName);
      })
      var lookup = {};
      var items = this.data
    
   
      for (var item, i = 0; item = items[i++];) {
        var name = item.DeptName;
        //var name = item.CWQPNo;

        if (!(name in lookup)) {
          lookup[name] = 1;
          this.deptDropDownList.push(name);
        }
      }
      
      this.loadBarChart(this.target, this.actual, this.label);
      this.loadLineChart(this.target, this.actual, this.label);
     // console.log(this.data);
     
      //console.log(this.deptlist);
    });
  }

  getPivotData(pivotData:KpiGraphicalModel[]){
  
    const results = []; var checks = [];
    for (var l = 0; l < pivotData.length; l++) {
        if (!checks[pivotData[l].QualityIndices]) {
            results.push(pivotData[l]);
        }
        checks[pivotData[l].QualityIndices] = true;
    }
    
    const month = Array.from(new Set(pivotData.map(obj=>obj.Month)))
    .map(m=>{
      return{
        Month:pivotData.find(v=>v.Month===m).Month
      };
    });

    this.monthList = month;
    console.log(this.monthList);
    const qc = Array.from(new Set(pivotData.map(obj=>obj.QualityIndices)))
    .map(m=>{
      return{
        QualityIndices:pivotData.find(v=>v.QualityIndices===m).QualityIndices
      };
    });
    
    this.qc = qc;
    console.log(this.qc);
    const kpi = Array.from(new Set(pivotData.map(obj=>obj.KpiName)))
    .map(m=>{
      return{
        KpiName:pivotData.find(v=>v.KpiName===m).KpiName
      };
    });
    this.kpiList = kpi;
    for(let i=0; i<results.length;i++){
      const mem ={};
      const Department = results[i].DeptName;
      const CWQPNo = results[i].KpiName;
      const QualityIndices = results[i].QualityIndices;
      const Criteria = results[i].Criteria;
      const Measurement = results[i].Measurment;
      const Target = results[i].Target;
      const Year = results[i].Year;
      const PivotDataList = results[i];
      
      mem['Department'] = Department;
      mem['CWQPNo'] = CWQPNo;
      mem['QualityIndices'] = QualityIndices;
      mem['Criteria'] = Criteria;
      mem['Measurement'] = Measurement;
      mem['Target'] = Target;
      mem['Year'] = Year;
      
      for(let p=0;p<pivotData.length;p++){
       const currentpivot = pivotData[p];
      // if(currentpivot.DeptName== PivotDataList.DeptName &&  currentpivot.KpiName == PivotDataList.KpiName){
        if(currentpivot.DeptName== PivotDataList.DeptName &&  currentpivot.KpiName == PivotDataList.KpiName
           && currentpivot.QualityIndices == PivotDataList.QualityIndices){
        for(let j = 0; j<month.length; j++){
            
          if(currentpivot.Month == month[j].Month){
           
           mem[month[j].Month] = currentpivot.Actual
         
          }
        //      else{
        //  mem[month[j].Month]= '';
        // }
           }
       }
          
        }
  this.AllItems.push(mem);
  this.dataList=this.AllItems;
}
   console.log(this.AllItems); 
  }
 
  onSelectDpt(event){
    
    this.selectedDept = event.target.value;
    
    const dept = {};
  const deptdata = this.data.filter(x=>x.DeptName == this.selectedDept)
  deptdata.forEach(d=>{
    dept['Department'] =d.DeptName;
    dept['KpiName']= d.KpiName;
    dept['QualityIndices'] = d.QualityIndices;
    
  })
  this.deptlist.push(dept);
   console.log(this.deptlist);
     }

     onSelectYear(event){
        this.selectedYear = [];
        this.selectedYear = +event.target.value;
      }


       groupBy(data, keys) { 

        if (keys.length == 0) return data;
    
        // The current key to perform the grouping on:
        var key = keys[0];
    
        // Loop through the data and construct buckets for
        // all of the unique keys:
        var groups = {};
        for (var i = 0; i < data.length; i++)
        {
            var row = data[i];
            var groupValue = row[key];
            //groups[groupValue] = groupValue
    
            if (groups[groupValue] == undefined)
            {
              groups[groupValue] = new Array();
            }
    
            groups[groupValue].push(row);
        }
    
        // Remove the first element from the groups array:
        keys.reverse();
        keys.pop()
        keys.reverse();
    
        // If there are no more keys left, we're done:
        if (keys.length == 0) return groups;
    
        // Otherwise, handle further groupings:
        for (var group in groups)
        {
            groups[group] = this.groupBy(groups[group], keys.slice());
        }
    
        return groups;
    }
    showAllKpiDeptWise(){
     
      this.lineChartList=[];
      this.keyModel = [];
        this.label = [];
        this.actual = [];
        this.dataList = [];
        this.target = [];
        var groupedData = this.groupBy(this.data, ["DeptName","KpiName"]);
        //var groupedData = this.groupBy(this.data, ["DeptName","KpiName"]);
        const keys = Object.keys(groupedData) 
       // const values = Object.values(groupedData)
        console.log(groupedData);
        Object.keys(groupedData).forEach(key => {
        if(this.selectedDept == key) {
          var kpi = groupedData[key] 
          Object.keys(kpi).forEach(key1=>{
           const kpirec = kpi[key1];
           //console.log(kpirec);
         
           for(let i = 0; i<kpirec.length; i++ ){
             this.keyModel.push({
              KpiName:key1,
              KpiList:kpirec, 
              QualityIndices:kpirec[i].QualityIndices
             })
           }         
           
          }) 
        }
                   
        });
    //console.log(this.keyModel);
    let check = 0;
   
    this.keyModel.forEach(ch=>{
      this.kpiList.forEach(kp=>{
      const kpiname = kp.KpiName; 
      const QualityIndices = ch.QualityIndices;
      if(ch.KpiName == kpiname){
        if(check == 0 ){
                ch.KpiList.forEach(a=>{
                 if(a.Year == this.selectedYear){
                  this.actual.push(a.Actual);
                  this.label.push(a.Month);
                  this.target.push(a.Target)
                   check = check+1;
                 }  
  
                })
                this.loadAllKpiDeptWise(this.target, this.actual, this.label,kpiname,QualityIndices);
               }  
               
               check--;
      }
      })
        // switch(ch.KpiName){
        //   case "CWQP-1A":
        //     if(check == 0 ){
        //       ch.KpiList.forEach(a=>{
        //        if(a.Year == this.selectedYear){
        //         this.actual.push(a.Actual);
        //         this.label.push(a.Month);
        //         this.target.push(a.Target)
        //          check = check+1;
        //        }  

        //       })
        //       this.loadAllKpiDeptWise(this.target, this.actual, this.label,'CWQP-1A');
        //      }  
             
        //      check--;
        //   break;
        //   case "CWQP-1B":
        //     if(check == 0){
        //       ch.KpiList.forEach(a=>{
        //         if(a.Year == this.selectedYear){
        //          this.actual.push(a.Actual);
        //          //this.label.push(a.Month);
        //          this.target.push(a.Target)
        //           check = check+1;
        //         }  
        //         else if(this.label.length==0) {
        //           this.label.push(a.Month);
        //         }                             
        //        })
        //       this.loadAllKpiDeptWise(this.target, this.actual, this.label,'CWQP-1B');
        //      }  
             
        //      check--;
        //     break;
        //     case "CWQP-1C":
        //       if(check == 0){
        //         ch.KpiList.forEach(a=>{
        //           if(a.Year == this.selectedYear){
        //            this.actual.push(a.Actual);
        //            //this.label.push(a.Month);
        //            this.target.push(a.Target)
        //             check = check+1;
        //           } 
        //           else if(this.label.length==0) {
        //             this.label.push(a.Month);
        //           }                           
        //          })
        //         this.loadAllKpiDeptWise(this.target, this.actual, this.label,'CWQP-1C');
        //        }  
               
        //        check--;
        //       break;
        //       case "CWQP-3A":
        //         if(check == 0){
        //           ch.KpiList.forEach(a=>{
        //             if(a.Year == this.selectedYear){
        //              this.actual.push(a.Actual);
        //              //this.label.push(a.Month);
        //              this.target.push(a.Target)
        //               check = check+1;
        //             } 
        //             else if(this.label.length==0) {
        //               this.label.push(a.Month);
        //             }                              
        //            })
        //           this.loadAllKpiDeptWise(this.target, this.actual, this.label,'CWQP-3A');
        //          }  
                 
        //          check--;
        //         break;
        //         case "CWQP-3B":
        //           if(check == 0){
        //             ch.KpiList.forEach(a=>{
        //               if(a.Year == this.selectedYear){
        //                this.actual.push(a.Actual);
        //               // this.label.push(a.Month);
        //                this.target.push(a.Target)
        //                 check = check+1;
        //               }   
        //               else if(this.label.length==0) {
        //                 this.label.push(a.Month);
        //               }                            
        //              })
        //             this.loadAllKpiDeptWise(this.target, this.actual, this.label,'CWQP-3B');
        //            }  
                   
        //            check--;
        //           break;
        //           case "CWQP-3C":
        //             if(check == 0){
        //               ch.KpiList.forEach(a=>{
        //                 if(a.Year == this.selectedYear){
        //                  this.actual.push(a.Actual);
        //                 // this.label.push(a.Month);
        //                  this.target.push(a.Target)
        //                   check = check+1;
        //                 }  
        //                 else if(this.label.length==0) {
        //                   this.label.push(a.Month);
        //                 }                             
        //                })
        //               this.loadAllKpiDeptWise(this.target, this.actual, this.label,'CWQP-3C');
        //              }  
                     
        //              check--;
        //           break;
        //           case "CWQP-4A":
        //             if(check == 0){
        //               ch.KpiList.forEach(a=>{
        //                 if(a.Year == this.selectedYear){
        //                  this.actual.push(a.Actual);
        //                  //this.label.push(a.Month);
        //                  this.target.push(a.Target)
        //                   check = check+1;
        //                 }
        //                 else if(this.label.length==0) {
        //                   this.label.push(a.Month);
        //                 }                               
        //                })
        //               this.loadAllKpiDeptWise(this.target, this.actual, this.label,'CWQP-4A');
        //              }  
                     
        //              check--;
        //           break;
        //           case "CWQP-4B":
        //             if(check == 0){
        //               ch.KpiList.forEach(a=>{
        //                 if(a.Year == this.selectedYear){
        //                  this.actual.push(a.Actual);
        //                 // this.label.push(a.Month);
        //                  this.target.push(a.Target)
        //                   check = check+1;
        //                 }    
        //                 else if(this.label.length==0) {
        //                   this.label.push(a.Month);
        //                 }                           
        //                })
        //               this.loadAllKpiDeptWise(this.target, this.actual, this.label,'CWQP-4B');
        //              }  
                     
        //              check--;
        //           break;
        //           case "CWQP-4C":
        //             if(check == 0){
        //               ch.KpiList.forEach(a=>{
        //                 if(a.Year == this.selectedYear){
        //                  this.actual.push(a.Actual);
        //                 // this.label.push(a.Month);
        //                  this.target.push(a.Target)
        //                   check = check+1;
        //                 }   
        //                 else if(this.label.length==0) {
        //                   this.label.push(a.Month);
        //                 }                            
        //                })
        //               this.loadAllKpiDeptWise(this.target, this.actual, this.label,'CWQP-4C');
        //              }  
                     
        //              check--;
        //           break;
        //           case "CWQP-5A":
        //             if(check == 0){
        //               ch.KpiList.forEach(a=>{
        //                 if(a.Year == this.selectedYear){
        //                  this.actual.push(a.Actual);
        //                  //this.label.push(a.Month);
        //                  this.target.push(a.Target)
        //                   check = check+1;
        //                 }   
        //                 else if(this.label.length==0) {
        //                   this.label.push(a.Month);
        //                 }                            
        //                })
        //               this.loadAllKpiDeptWise(this.target, this.actual, this.label,'CWQP-5A');
        //              }  
                     
        //              check--;
        //           break;
        // }
      
      
    })
    this.showalldeptwise = true;
//console.log(this.keyModel);
      //if(groupedData.)
    }
    Submit(){
      this.showAllKpiDeptWise();
    }
      filterKPI(){
        this.showalldeptwise = false;
        this.label = [];
        this.actual = [];
        this.dataList = [];
        this.target = [];
          
      
          this.data.forEach(x => {
             if(x.DeptName == this.selectedDept && x.Year == this.selectedYear ){
              this.dataList.push(x);
              //console.log(this.dataList);
              //this.actual.push(x.Actual)
              this.actual.push(x.July);
              this.label.push(x.Month);
              this.target.push(x.Target)
            }
         
          
          });
          this.loadLineChart(this.target, this.actual, this.label);
        
      }

      loadBarChart(target: any[], actual: any[], label: any[]) {

        this.barChart = {
          labels: label,
          datasets: [
            {
              label: 'Target',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: target
            },
            {
              label: 'Actual',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: actual
            }
          ]
        }
      }
    
    
    loadLineChart(target: any[], actual: any[], label: any[]){
      this.lineChart = {
        labels: label,
        datasets: [
          {
            label: 'Target',
            data: target,
            fill: false,            
            borderColor: '#1E88E5'
          },
          {
            label: 'Actual',
            data: actual,
            fill: false,          
            borderColor: '#7CB342'
          }
        ]
      }
    }

    

    
    loadAllKpiDeptWise(target: any[], actual: any[], label: any[],kpi:string,qualityIndices:string){
      var target1 = target.map(v => parseInt(v, 10));
      var actual1 = actual.map(v => parseInt(v, 10));

      this.lineChartDeptWise = {
        labels: label,
        datasets: [
          {
            label: 'Target',
            
            data: target1,
            fill: false,
            borderColor: '#1E88E5'
          },
         
          {
            label: 'Actual',
            data: actual1,
            fill: false,
            borderColor: '#7CB342'
          }
        ]
      }
    //   this.lineChartDeptWise = {
    //     legend: {
    //         position: 'right'
    //     }
    // };
      this.lineChartList.push({
        ['DataList']:this.lineChartDeptWise,
        ['KPIName']:kpi,
        ['QualityIndices']:qualityIndices
      });
     if(this.label.length==0){
          this.isShowMessage=true;
          this.lineChartList =[];
          alert("Data is not available");
     }
     console.log(this.lineChartList);
      this.actual = [];
      //this.dataList = [];
      this.target = [];
      this.label =[];
      
    }
    loadAllKpiDeptWiseNew(target: any[], actual: any[], label: any[],kpi:string){
      this.lineChartDeptWise = {
        labels: label,
        datasets: [
          {
            label: 'Target',
            data: target,
            fill: false,
            borderColor: '#1E88E5'
          },
          {
            label: 'Actual',
            data: actual,
            fill: false,
            borderColor: '#7CB342'
          }
        ]
      }
      this.lineChartList.push({
        ['DataList']:this.lineChartDeptWise,
        ['KPIName']:kpi
       // ['QualityIndices']:kpi
      });
     if(this.label.length==0){
          this.isShowMessage=true;
          this.lineChartList =[];
          alert("Data is not available");
     }
     this.options = {
     
      plugins: {
        datalabels: {
        align: 'end',
        anchor: 'end',
        borderRadius: 4,
        backgroundColor:"teal",
        color: 'white',
        font: {
        weight: 'bold'
        }
        }
        },
        title: {
          display: true,
          text: 'My Title',
          fontSize: 16
      },
      legend: {
          position: 'top'
      }
  };
     console.log(this.lineChartList);
      this.actual = [];
      //this.dataList = [];
      this.target = [];

      
    }
    filterKPINew(){
      this.showalldeptwise = false;
      this.label = [];
      this.actual = [];
      //this.dataList = [];
      this.target = [];
        
    // this.monthList.forEach(m=>{
    //   this.label.push(m.Month);
    // })
        this.dataList.forEach(x => {
           if(x.DeptName == this.selectedDept && x.Year == this.selectedYear ){
           //if(x.)
            this.actual.push(x.July);
            this.label.push(x.Month);
            this.target.push(x.Target)
           // this.loadAllKpiDeptWise(this.target, this.actual, this.label,x.KpiName);
          }
       
        
        });
       
      
    }

}


