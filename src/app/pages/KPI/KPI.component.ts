import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { KpiModel, DeptNameModel, kpiMaster } from './KPI.model';
import { KPIService } from './KPI.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Employee } from '../Login/Login.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { isNullOrUndefined } from 'util';
import { NbToastrService } from '@nebular/theme';



@Component({
  selector: 'app-KPI',
  templateUrl: './KPI.component.html',
  styleUrls: ['./KPI.component.css']
})
export class KPIComponent implements OnInit {
  public valuedate: Date;
  year=new Date().getFullYear();
  min = new Date(2020, 0, 1)
  max = new Date(2050, 11, 31)
  displayedit:boolean=false;
  documentNo:any;
  DeptName:any;
  data: KpiModel[];
  roleid:number;
  kpiMgtData: KpiModel[]=[];
  dataList: KpiModel[];
  dataListForFilter: KpiModel[]=[];
  monthselected:any;
  value: boolean;
  uom:any[]=[];
  deptname: DeptNameModel[];
  barChart: any;
  lineChart: any;
  allDataList: kpiMaster[];
  selectedDeptName:any;
  label: any[] = [];
  target: any[] = [];
  actual: any[] = [];
  employeeId:any;
  employee=new Employee();
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
    responsive: true,
    scales: { 
    //   xAxes: [{
    //   ticks: {
    //     display: true,
    //     beginAtZero: true,
    //     // maxRotation:0,
    //     //padding:8,
    //     // maxTicksLimit:2,
    //   }
    // }],
     yAxes: [{
      
      display: true,
    
      scaleLabel: {
        
      },
      ticks: {
        beginAtZero: true,
        min:0
        //userCallback: function(label, index, labels) { if (Math.floor(label) === label) { return label; } }, 
       
      }
    }] },
  //   plugins: {
  //    datalabels: {
  //       anchor: 'end',
  //       align: 'end',
  //       font: {
  //         size: 10,
  //       }
  //    }
  //   },
  //   legend:{
  //     position:'top',
  //     display: true,
  //       // labels: {
  //       //   fontColor: "Red",
  //       //   fontSize: 25
  //       // }
  //     //align:'end'
      
  //   }
   };
    public barChartPlugins = [ChartDataLabels];
  constructor(
    private kpiService: KPIService, private formBuilder: FormBuilder, chartModule: ChartModule,
    private cdRef: ChangeDetectorRef, private route: ActivatedRoute, private router: Router,private toasterService: NbToastrService) {   }

  ngOnInit() {
    if (localStorage.getItem("Employee"))
    this.employee = JSON.parse(localStorage.getItem("Employee"));
    
  else
    this.router.navigateByUrl("Login");
    console.log(this.employee.OrgDepartmentId);
    this.loadKpiReport();
    if(this.employee.RoleId == 5 )
    {
      this.roleid=this.employee.RoleId;
      this.loadDeptName();
    }
    else{
      this.roleid=this.employee.RoleId;
      var objdata=new DeptNameModel();
objdata.DeptId=this.employee.OrgDepartmentId;
objdata.DepName=this.employee.OrgDepartmentName;
this.deptlist[0] = objdata; 
    }
    
  }

  loadKpiReport() {
    this.kpiService.getAllKpi().subscribe(x => {
      debugger;
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
      this.filterKPI();

      //console.log(this.deptlist);
    });
  }

  loadDeptName(){
    this.kpiService.getDeptName().subscribe(data => {
      this.deptlist = data; 
    //   if(this.employee.RoleId == 5 )
    // {
      // debugger;
      // var objdet=new DeptNameModel();
      // objdet.DepName="Management QI";
      // objdet.DeptId="KPI Management";
      // this.deptlist.push(objdet);
      // this.deptlist=this.deptlist.sort(x=>x.DepName);
      // console.log( this.deptlist);
    // } 
    })
  }
  onSelectMonth(event){
    debugger;
    this.selectedMonth = event.target.value; 
this.monthselected=this.selectedMonth.substring(0, 3);
  }

onSelectDpt(event){
  this.selectedDept = event.target.value;
  const deptName = this.deptlist.filter(x=>x.DeptId == +(this.selectedDept));
     this.selectedDeptName = Object.assign({}, ...deptName);
   }
  onSelectYear(event){
    debugger;
    this.selectedYear = [];
    this.selectedYear = event.target.value;
  }
filterUnsuccessKPI(){
  this.dataList = [];
  this.dataList= this.dataListForFilter.filter(x=>(x.Target)-(+x.Actual)>0)
}
  filterKPI(){
    //alert(this.selectedMonth);
    this.displayedit=false;
    this.label = [];
    this.actual = [];
    this.dataList = [];
    this.dataListForFilter = [];
    this.target = [];
  this.selectedYear=this.valuedate.getFullYear();
     this.kpiMgtData = this.data.filter(itm=>itm.MgtKPICheckedStatus== true);
     if(this.selectedDept== "KPI Management"){
      this.kpiMgtData.forEach(kpimg=>{
        if( kpimg.Year == this.selectedYear ){
          if(this.selectedMonth=="April")
         {
          kpimg.Actual=kpimg.aprilachieved;
          this.actual.push(kpimg.aprilachieved);
         }
         if(this.selectedMonth=="May")
         {
          kpimg.Actual=kpimg.mayachieved;
          this.actual.push(kpimg.mayachieved);
         }
         if(this.selectedMonth=="June")
         {
          kpimg.Actual=kpimg.juneachieved;
          this.actual.push(kpimg.juneachieved);
         }
         if(this.selectedMonth=="July")
         {
          kpimg.Actual=kpimg.julyachieved;
          this.actual.push(kpimg.julyachieved);
         }
         if(this.selectedMonth=="August")
         {
          kpimg.Actual=kpimg.augustachieved;
          this.actual.push(kpimg.augustachieved);
         }
         if(this.selectedMonth=="September")
         {
          kpimg.Actual=kpimg.sepachieved;
          this.actual.push(kpimg.sepachieved);
         }
         if(this.selectedMonth=="October")
         {
          kpimg.Actual=kpimg.octachieved;
          this.actual.push(kpimg.octachieved);
         }
         if(this.selectedMonth=="November")
         {
          kpimg.Actual=kpimg.novachieved;
          this.actual.push(kpimg.novachieved);
         }
         if(this.selectedMonth=="December")
         {
          kpimg.Actual=kpimg.decachieved;
          this.actual.push(kpimg.decachieved);
         }
         if(this.selectedMonth=="January")
         {
          kpimg.Actual=kpimg.janachieved;
          this.actual.push(kpimg.janachieved);
         }
         if(this.selectedMonth=="february")
         {
          kpimg.Actual=kpimg.febachieved;
          this.actual.push(kpimg.febachieved);
         }
         if(this.selectedMonth=="March")
         {
          kpimg.Actual=kpimg.marchachieved;
          this.actual.push(kpimg.marchachieved);
         }
          this.documentNo=kpimg.DocNo;
          this.actual.push(kpimg.Actual);
          this.label.push(kpimg.CWQPNo);
          if(this.selectedMonth=="April")
         {
          kpimg.Target=kpimg.aprilTarget;
           this.target.push(kpimg.aprilTarget)
         }
         if(this.selectedMonth=="May")
         {
           if(isNullOrUndefined(kpimg.mayTarget))
           {
            kpimg.Target=kpimg.aprilTarget;
            this.target.push(kpimg.aprilTarget)
           }
           else{
            kpimg.Target=kpimg.mayTarget;
            this.target.push(kpimg.mayTarget)
           }
         }
         if(this.selectedMonth=="June")
         {
          if(isNullOrUndefined(kpimg.juneTarget))
          {
            if(isNullOrUndefined(kpimg.mayTarget))
           {
            kpimg.Target=kpimg.aprilTarget;
            this.target.push(kpimg.aprilTarget)
           }
           else{
            kpimg.Target=kpimg.mayTarget;
            this.target.push(kpimg.mayTarget)
           }
          }
          else{
            kpimg.Target=kpimg.juneTarget;
            this.target.push(kpimg.juneTarget)
           }
         }
         if(this.selectedMonth=="July")
         {
          if(isNullOrUndefined(kpimg.julyTarget))
          {
            if(isNullOrUndefined(kpimg.juneTarget))
          {
            if(isNullOrUndefined(kpimg.mayTarget)){
              if(isNullOrUndefined(kpimg.aprilTarget)){
                kpimg.Target=kpimg.marTarget;
                  this.target.push(kpimg.marTarget);
                }
                else{
                  kpimg.Target=kpimg.aprilTarget;
                  this.target.push(kpimg.aprilTarget);
                }
            }
            else{
              kpimg.Target=kpimg.mayTarget;
              this.target.push(kpimg.mayTarget);
            }
          }
          else{
            kpimg.Target=kpimg.juneTarget;
            this.target.push(kpimg.juneTarget);
          }
          }
          else
          {
            kpimg.Target=kpimg.julyTarget;
            this.target.push(kpimg.julyTarget);
          }

         }
         if(this.selectedMonth=="August")
         {
          if(isNullOrUndefined(kpimg.augTarget))
          {
           if(isNullOrUndefined(kpimg.julyTarget))
           {
             if(isNullOrUndefined(kpimg.juneTarget))
           {
             if(isNullOrUndefined(kpimg.mayTarget)){
               if(isNullOrUndefined(kpimg.aprilTarget)){
                 kpimg.Target=kpimg.marTarget;
                   this.target.push(kpimg.marTarget);
                 }
                 else{
                   kpimg.Target=kpimg.aprilTarget;
                   this.target.push(kpimg.aprilTarget);
                 }
             }
             else{
               kpimg.Target=kpimg.mayTarget;
               this.target.push(kpimg.mayTarget);
             }
           }
           else{
             kpimg.Target=kpimg.juneTarget;
             this.target.push(kpimg.juneTarget);
           }
           }
           else
           {
             kpimg.Target=kpimg.julyTarget;
             this.target.push(kpimg.julyTarget);
           }
 
          
        }
        else{
          kpimg.Target=kpimg.augTarget;
          this.target.push(kpimg.augTarget);
        }
      
         }
         else{
          kpimg.Target=kpimg.augTarget;
          this.target.push(kpimg.augTarget);
         }

         if(this.selectedMonth=="September")
         {
          if(isNullOrUndefined(kpimg.sepTarget))
          {
          if(isNullOrUndefined(kpimg.augTarget))
          {
            if(isNullOrUndefined(kpimg.julyTarget))
            {
              if(isNullOrUndefined(kpimg.juneTarget))
            {
              if(isNullOrUndefined(kpimg.mayTarget)){
                if(isNullOrUndefined(kpimg.aprilTarget)){
                  kpimg.Target=kpimg.marTarget;
                    this.target.push(kpimg.marTarget);
                  }
                  else{
                    kpimg.Target=kpimg.aprilTarget;
                    this.target.push(kpimg.aprilTarget);
                  }
              }
              else{
                kpimg.Target=kpimg.mayTarget;
                this.target.push(kpimg.mayTarget);
              }
            }
            else{
              kpimg.Target=kpimg.juneTarget;
              this.target.push(kpimg.juneTarget);
            }
            }
            else
            {
              kpimg.Target=kpimg.julyTarget;
              this.target.push(kpimg.julyTarget);
            }
  
           
          }
          else{
           kpimg.Target=kpimg.augTarget;
           this.target.push(kpimg.augTarget);
          }
         }
         else{
          kpimg.Target=kpimg.sepTarget;
          this.target.push(kpimg.sepTarget);
         }
        }
         if(this.selectedMonth=="October")
         {
          if(isNullOrUndefined(kpimg.octTarget))
          {
          if(isNullOrUndefined(kpimg.sepTarget))
          {
           if(isNullOrUndefined(kpimg.augTarget))
           {
             if(isNullOrUndefined(kpimg.julyTarget))
             {
               if(isNullOrUndefined(kpimg.juneTarget))
             {
               if(isNullOrUndefined(kpimg.mayTarget)){
                 if(isNullOrUndefined(kpimg.aprilTarget)){
                   kpimg.Target=kpimg.marTarget;
                     this.target.push(kpimg.marTarget);
                   }
                   else{
                     kpimg.Target=kpimg.aprilTarget;
                     this.target.push(kpimg.aprilTarget);
                   }
               }
               else{
                 kpimg.Target=kpimg.mayTarget;
                 this.target.push(kpimg.mayTarget);
               }
             }
             else{
               kpimg.Target=kpimg.juneTarget;
               this.target.push(kpimg.juneTarget);
             }
             }
             else
             {
               kpimg.Target=kpimg.julyTarget;
               this.target.push(kpimg.julyTarget);
             }
   
            
           }
           else{
            kpimg.Target=kpimg.augTarget;
            this.target.push(kpimg.augTarget);
           }
          }
          else{
           kpimg.Target=kpimg.sepTarget;
           this.target.push(kpimg.sepTarget);
          }
         }
         else{
          kpimg.Target=kpimg.octachieved;
          this.target.push(kpimg.octTarget);
         }
        }
         if(this.selectedMonth=="November")
         {
          if(isNullOrUndefined(kpimg.novTarget))
          {
           if(isNullOrUndefined(kpimg.octTarget))
           {
            if(isNullOrUndefined(kpimg.sepTarget))
            {
             if(isNullOrUndefined(kpimg.augTarget))
             {
              if(isNullOrUndefined(kpimg.julyTarget))
              {
                if(isNullOrUndefined(kpimg.juneTarget))
              {
                if(isNullOrUndefined(kpimg.mayTarget)){
                  if(isNullOrUndefined(kpimg.aprilTarget)){
                    kpimg.Target=kpimg.marTarget;
                      this.target.push(kpimg.marTarget);
                    }
                    else{
                      kpimg.Target=kpimg.aprilTarget;
                      this.target.push(kpimg.aprilTarget);
                    }
                }
                else{
                  kpimg.Target=kpimg.mayTarget;
                  this.target.push(kpimg.mayTarget);
                }
              }
              else{
                kpimg.Target=kpimg.juneTarget;
                this.target.push(kpimg.juneTarget);
              }
              }
              else
              {
                kpimg.Target=kpimg.julyTarget;
                this.target.push(kpimg.julyTarget);
              }
    
             }
             else{
              kpimg.Target=kpimg.augTarget;
              this.target.push(kpimg.augTarget);
             }
            }
            else{
              kpimg.Target=kpimg.sepTarget;
              this.target.push(kpimg.sepTarget);
             }
           }
           else{
            kpimg.Target=kpimg.octTarget;
            this.target.push(kpimg.octTarget);
           }
          }
          else{
            kpimg.Target=kpimg.novTarget;
            this.target.push(kpimg.novTarget);
           }
         }
        

         if(this.selectedMonth=="December")
         {
          if(isNullOrUndefined(kpimg.decTarget))
          {
           if(isNullOrUndefined(kpimg.novTarget))
           {
            if(isNullOrUndefined(kpimg.octTarget))
            {
             if(isNullOrUndefined(kpimg.sepTarget))
             {
              if(isNullOrUndefined(kpimg.augTarget))
              {
               if(isNullOrUndefined(kpimg.julyTarget))
               {
                 if(isNullOrUndefined(kpimg.juneTarget))
               {
                 if(isNullOrUndefined(kpimg.mayTarget)){
                   if(isNullOrUndefined(kpimg.aprilTarget)){
                     kpimg.Target=kpimg.marTarget;
                       this.target.push(kpimg.marTarget);
                     }
                     else{
                       kpimg.Target=kpimg.aprilTarget;
                       this.target.push(kpimg.aprilTarget);
                     }
                 }
                 else{
                   kpimg.Target=kpimg.mayTarget;
                   this.target.push(kpimg.mayTarget);
                 }
               }
               else{
                 kpimg.Target=kpimg.juneTarget;
                 this.target.push(kpimg.juneTarget);
               }
               }
               else
               {
                 kpimg.Target=kpimg.julyTarget;
                 this.target.push(kpimg.julyTarget);
               }
     
              }
              else{
                kpimg.Target=kpimg.augTarget;
                this.target.push(kpimg.augTarget);
               }
             }
             else{
              kpimg.Target=kpimg.sepTarget;
              this.target.push(kpimg.sepTarget);
             }
            }
            else{
              kpimg.Target=kpimg.octTarget;
              this.target.push(kpimg.octTarget);
             }
           }
           else{
            kpimg.Target=kpimg.novTarget;
            this.target.push(kpimg.novTarget);
           }
          }
          else{
            kpimg.Target=kpimg.decTarget;
            this.target.push(kpimg.decTarget);
           }
         }
        

          debugger;
          console.log(kpimg);
          this.dataList.push(kpimg);
          this.dataListForFilter.push(kpimg);
        }
       })
     }
    else{
      this.data.forEach(kpimg => {
        if(kpimg.DeptId == this.selectedDept && kpimg.Year == this.selectedYear ){
          //debugger;
          if(this.selectedMonth=="April")
          {
           kpimg.Actual=kpimg.aprilachieved;
           this.actual.push(kpimg.aprilachieved);
          }
          if(this.selectedMonth=="May")
          {
           kpimg.Actual=kpimg.mayachieved;
           this.actual.push(kpimg.mayachieved);
          }
          if(this.selectedMonth=="June")
          {
           kpimg.Actual=kpimg.juneachieved;
           this.actual.push(kpimg.juneachieved);
          }
          if(this.selectedMonth=="July")
          {
           kpimg.Actual=kpimg.julyachieved;
           this.actual.push(kpimg.julyachieved);
          }
          if(this.selectedMonth=="August")
          {
           kpimg.Actual=kpimg.augustachieved;
           this.actual.push(kpimg.augustachieved);
          }
          if(this.selectedMonth=="September")
          {
           kpimg.Actual=kpimg.sepachieved;
           this.actual.push(kpimg.sepachieved);
          }
          if(this.selectedMonth=="October")
          {
           kpimg.Actual=kpimg.octachieved;
           this.actual.push(kpimg.octachieved);
          }
          if(this.selectedMonth=="November")
          {
           kpimg.Actual=kpimg.novachieved;
           this.actual.push(kpimg.novachieved);
          }
          if(this.selectedMonth=="December")
          {
           kpimg.Actual=kpimg.decachieved;
           this.actual.push(kpimg.decachieved);
          }
          if(this.selectedMonth=="January")
          {
           kpimg.Actual=kpimg.janachieved;
           this.actual.push(kpimg.janachieved);
          }
          if(this.selectedMonth=="february")
          {
           kpimg.Actual=kpimg.febachieved;
           this.actual.push(kpimg.febachieved);
          }
          if(this.selectedMonth=="March")
          {
           kpimg.Actual=kpimg.marchachieved;
           this.actual.push(kpimg.marchachieved);
          }





         
         this.uom.push(kpimg.Unitofmeasurement);
         this.documentNo=kpimg.DocNo;
         this.DeptName=kpimg.DeptName;
         this.label.push(kpimg.QIShortText);
         //this.actual.push(kpimg.Actual);
         if(this.selectedMonth=="April")
         {
          kpimg.Target=kpimg.aprilTarget;
           this.target.push(kpimg.aprilTarget)
         }
         if(this.selectedMonth=="May")
         {
           if(isNullOrUndefined(kpimg.mayTarget))
           {
            kpimg.Target=kpimg.aprilTarget;
            this.target.push(kpimg.aprilTarget)
           }
           else{
            kpimg.Target=kpimg.mayTarget;
            this.target.push(kpimg.mayTarget)
           }
         }
         if(this.selectedMonth=="June")
         {
          if(isNullOrUndefined(kpimg.juneTarget))
          {
            if(isNullOrUndefined(kpimg.mayTarget))
           {
            kpimg.Target=kpimg.aprilTarget;
            this.target.push(kpimg.aprilTarget)
           }
           else{
            kpimg.Target=kpimg.mayTarget;
            this.target.push(kpimg.mayTarget)
           }
          }
          else{
            kpimg.Target=kpimg.juneTarget;
            this.target.push(kpimg.juneTarget)
           }
         }
         if(this.selectedMonth=="July")
         {
          if(isNullOrUndefined(kpimg.julyTarget))
          {
            if(isNullOrUndefined(kpimg.juneTarget))
          {
            if(isNullOrUndefined(kpimg.mayTarget)){
              if(isNullOrUndefined(kpimg.aprilTarget)){
                kpimg.Target=kpimg.marTarget;
                  this.target.push(kpimg.marTarget);
                }
                else{
                  kpimg.Target=kpimg.aprilTarget;
                  this.target.push(kpimg.aprilTarget);
                }
            }
            else{
              kpimg.Target=kpimg.mayTarget;
              this.target.push(kpimg.mayTarget);
            }
          }
          else{
            kpimg.Target=kpimg.juneTarget;
            this.target.push(kpimg.juneTarget);
          }
          }
          else
          {
            kpimg.Target=kpimg.julyTarget;
            this.target.push(kpimg.julyTarget);
          }

         }
         if(this.selectedMonth=="August")
         {
          if(isNullOrUndefined(kpimg.augTarget))
          {
           if(isNullOrUndefined(kpimg.julyTarget))
           {
             if(isNullOrUndefined(kpimg.juneTarget))
           {
             if(isNullOrUndefined(kpimg.mayTarget)){
               if(isNullOrUndefined(kpimg.aprilTarget)){
                 kpimg.Target=kpimg.marTarget;
                   this.target.push(kpimg.marTarget);
                 }
                 else{
                   kpimg.Target=kpimg.aprilTarget;
                   this.target.push(kpimg.aprilTarget);
                 }
             }
             else{
               kpimg.Target=kpimg.mayTarget;
               this.target.push(kpimg.mayTarget);
             }
           }
           else{
             kpimg.Target=kpimg.juneTarget;
             this.target.push(kpimg.juneTarget);
           }
           }
           else
           {
             kpimg.Target=kpimg.julyTarget;
             this.target.push(kpimg.julyTarget);
           }
 
          
        }
        else{
          kpimg.Target=kpimg.augTarget;
          this.target.push(kpimg.augTarget);
        }
      
         }
         

         if(this.selectedMonth=="September")
         {
          if(isNullOrUndefined(kpimg.sepTarget))
          {
          if(isNullOrUndefined(kpimg.augTarget))
          {
            if(isNullOrUndefined(kpimg.julyTarget))
            {
              if(isNullOrUndefined(kpimg.juneTarget))
            {
              if(isNullOrUndefined(kpimg.mayTarget)){
                if(isNullOrUndefined(kpimg.aprilTarget)){
                  kpimg.Target=kpimg.marTarget;
                    this.target.push(kpimg.marTarget);
                  }
                  else{
                    kpimg.Target=kpimg.aprilTarget;
                    this.target.push(kpimg.aprilTarget);
                  }
              }
              else{
                kpimg.Target=kpimg.mayTarget;
                this.target.push(kpimg.mayTarget);
              }
            }
            else{
              kpimg.Target=kpimg.juneTarget;
              this.target.push(kpimg.juneTarget);
            }
            }
            else
            {
              kpimg.Target=kpimg.julyTarget;
              this.target.push(kpimg.julyTarget);
            }
  
           
          }
          else{
           kpimg.Target=kpimg.augTarget;
           this.target.push(kpimg.augTarget);
          }
         }
         else{
          kpimg.Target=kpimg.sepTarget;
          this.target.push(kpimg.sepTarget);
         }
        }
         if(this.selectedMonth=="October")
         {
          if(isNullOrUndefined(kpimg.octTarget))
          {
          if(isNullOrUndefined(kpimg.sepTarget))
          {
           if(isNullOrUndefined(kpimg.augTarget))
           {
             if(isNullOrUndefined(kpimg.julyTarget))
             {
               if(isNullOrUndefined(kpimg.juneTarget))
             {
               if(isNullOrUndefined(kpimg.mayTarget)){
                 if(isNullOrUndefined(kpimg.aprilTarget)){
                   kpimg.Target=kpimg.marTarget;
                     this.target.push(kpimg.marTarget);
                   }
                   else{
                     kpimg.Target=kpimg.aprilTarget;
                     this.target.push(kpimg.aprilTarget);
                   }
               }
               else{
                 kpimg.Target=kpimg.mayTarget;
                 this.target.push(kpimg.mayTarget);
               }
             }
             else{
               kpimg.Target=kpimg.juneTarget;
               this.target.push(kpimg.juneTarget);
             }
             }
             else
             {
               kpimg.Target=kpimg.julyTarget;
               this.target.push(kpimg.julyTarget);
             }
   
            
           }
           else{
            kpimg.Target=kpimg.augTarget;
            this.target.push(kpimg.augTarget);
           }
          }
          else{
           kpimg.Target=kpimg.sepTarget;
           this.target.push(kpimg.sepTarget);
          }
         }
         else{
          kpimg.Target=kpimg.octachieved;
          this.target.push(kpimg.octTarget);
         }
        }
         if(this.selectedMonth=="November")
         {
          if(isNullOrUndefined(kpimg.novTarget))
          {
           if(isNullOrUndefined(kpimg.octTarget))
           {
            if(isNullOrUndefined(kpimg.sepTarget))
            {
             if(isNullOrUndefined(kpimg.augTarget))
             {
              if(isNullOrUndefined(kpimg.julyTarget))
              {
                if(isNullOrUndefined(kpimg.juneTarget))
              {
                if(isNullOrUndefined(kpimg.mayTarget)){
                  if(isNullOrUndefined(kpimg.aprilTarget)){
                    kpimg.Target=kpimg.marTarget;
                      this.target.push(kpimg.marTarget);
                    }
                    else{
                      kpimg.Target=kpimg.aprilTarget;
                      this.target.push(kpimg.aprilTarget);
                    }
                }
                else{
                  kpimg.Target=kpimg.mayTarget;
                  this.target.push(kpimg.mayTarget);
                }
              }
              else{
                kpimg.Target=kpimg.juneTarget;
                this.target.push(kpimg.juneTarget);
              }
              }
              else
              {
                kpimg.Target=kpimg.julyTarget;
                this.target.push(kpimg.julyTarget);
              }
    
             }
             else{
              kpimg.Target=kpimg.augTarget;
              this.target.push(kpimg.augTarget);
             }
            }
            else{
              kpimg.Target=kpimg.sepTarget;
              this.target.push(kpimg.sepTarget);
             }
           }
           else{
            kpimg.Target=kpimg.octTarget;
            this.target.push(kpimg.octTarget);
           }
          }
          else{
            kpimg.Target=kpimg.novTarget;
            this.target.push(kpimg.novTarget);
           }
         }
        

         if(this.selectedMonth=="December")
         {
          if(isNullOrUndefined(kpimg.decTarget))
          {
           if(isNullOrUndefined(kpimg.novTarget))
           {
            if(isNullOrUndefined(kpimg.octTarget))
            {
             if(isNullOrUndefined(kpimg.sepTarget))
             {
              if(isNullOrUndefined(kpimg.augTarget))
              {
               if(isNullOrUndefined(kpimg.julyTarget))
               {
                 if(isNullOrUndefined(kpimg.juneTarget))
               {
                 if(isNullOrUndefined(kpimg.mayTarget)){
                   if(isNullOrUndefined(kpimg.aprilTarget)){
                     kpimg.Target=kpimg.marTarget;
                       this.target.push(kpimg.marTarget);
                     }
                     else{
                       kpimg.Target=kpimg.aprilTarget;
                       this.target.push(kpimg.aprilTarget);
                     }
                 }
                 else{
                   kpimg.Target=kpimg.mayTarget;
                   this.target.push(kpimg.mayTarget);
                 }
               }
               else{
                 kpimg.Target=kpimg.juneTarget;
                 this.target.push(kpimg.juneTarget);
               }
               }
               else
               {
                 kpimg.Target=kpimg.julyTarget;
                 this.target.push(kpimg.julyTarget);
               }
     
              }
              else{
                kpimg.Target=kpimg.augTarget;
                this.target.push(kpimg.augTarget);
               }
             }
             else{
              kpimg.Target=kpimg.sepTarget;
              this.target.push(kpimg.sepTarget);
             }
            }
            else{
              kpimg.Target=kpimg.octTarget;
              this.target.push(kpimg.octTarget);
             }
           }
           else{
            kpimg.Target=kpimg.novTarget;
            this.target.push(kpimg.novTarget);
           }
          }
          else{
            kpimg.Target=kpimg.decTarget;
            this.target.push(kpimg.decTarget);
           }
         }
        

         if(this.selectedMonth=="January")
         {
          if(isNullOrUndefined(kpimg.janTarget))
          {
          if(isNullOrUndefined(kpimg.decTarget))
          {
           if(isNullOrUndefined(kpimg.novTarget))
           {
            if(isNullOrUndefined(kpimg.octTarget))
            {
             if(isNullOrUndefined(kpimg.sepTarget))
             {
              if(isNullOrUndefined(kpimg.augTarget))
              {
               if(isNullOrUndefined(kpimg.julyTarget))
               {
                 if(isNullOrUndefined(kpimg.juneTarget))
               {
                 if(isNullOrUndefined(kpimg.mayTarget)){
                   if(isNullOrUndefined(kpimg.aprilTarget)){
                     kpimg.Target=kpimg.marTarget;
                       this.target.push(kpimg.marTarget);
                     }
                     else{
                       kpimg.Target=kpimg.aprilTarget;
                       this.target.push(kpimg.aprilTarget);
                     }
                 }
                 else{
                   kpimg.Target=kpimg.mayTarget;
                   this.target.push(kpimg.mayTarget);
                 }
               }
               else{
                 kpimg.Target=kpimg.juneTarget;
                 this.target.push(kpimg.juneTarget);
               }
               }
               else
               {
                 kpimg.Target=kpimg.julyTarget;
                 this.target.push(kpimg.julyTarget);
               }
     
              }
              else{
                kpimg.Target=kpimg.augTarget;
                this.target.push(kpimg.augTarget);
               }
             }
             else{
              kpimg.Target=kpimg.sepTarget;
              this.target.push(kpimg.sepTarget);
             }
            }
            else{
              kpimg.Target=kpimg.octTarget;
              this.target.push(kpimg.octTarget);
             }
           }
           else{
            kpimg.Target=kpimg.novTarget;
            this.target.push(kpimg.novTarget);
           }
          }
          else{
            kpimg.Target=kpimg.decTarget;
            this.target.push(kpimg.decTarget);
           }
         }
         else{
          kpimg.Target=kpimg.janTarget;
          this.target.push(kpimg.janTarget);
         }
        }
        
        if(this.selectedMonth=="February")
        {
          if(isNullOrUndefined(kpimg.febTarget))
        {
         if(isNullOrUndefined(kpimg.janTarget))
         {
         if(isNullOrUndefined(kpimg.decTarget))
         {
          if(isNullOrUndefined(kpimg.novTarget))
          {
           if(isNullOrUndefined(kpimg.octTarget))
           {
            if(isNullOrUndefined(kpimg.sepTarget))
            {
             if(isNullOrUndefined(kpimg.augTarget))
             {
              if(isNullOrUndefined(kpimg.julyTarget))
              {
                if(isNullOrUndefined(kpimg.juneTarget))
              {
                if(isNullOrUndefined(kpimg.mayTarget)){
                  if(isNullOrUndefined(kpimg.aprilTarget)){
                    kpimg.Target=kpimg.marTarget;
                      this.target.push(kpimg.marTarget);
                    }
                    else{
                      kpimg.Target=kpimg.aprilTarget;
                      this.target.push(kpimg.aprilTarget);
                    }
                }
                else{
                  kpimg.Target=kpimg.mayTarget;
                  this.target.push(kpimg.mayTarget);
                }
              }
              else{
                kpimg.Target=kpimg.juneTarget;
                this.target.push(kpimg.juneTarget);
              }
              }
              else
              {
                kpimg.Target=kpimg.julyTarget;
                this.target.push(kpimg.julyTarget);
              }
    
             }
             else{
               kpimg.Target=kpimg.augTarget;
               this.target.push(kpimg.augTarget);
              }
            }
            else{
             kpimg.Target=kpimg.sepTarget;
             this.target.push(kpimg.sepTarget);
            }
           }
           else{
             kpimg.Target=kpimg.octTarget;
             this.target.push(kpimg.octTarget);
            }
          }
          else{
           kpimg.Target=kpimg.novTarget;
           this.target.push(kpimg.novTarget);
          }
         }
         else{
           kpimg.Target=kpimg.decTarget;
           this.target.push(kpimg.decTarget);
          }
        }
        else{
         kpimg.Target=kpimg.janTarget;
         this.target.push(kpimg.janTarget);
        }
       }
       else{
        kpimg.Target=kpimg.febTarget;
        this.target.push(kpimg.febTarget);
       }
      }

      if(this.selectedMonth=="March")
      {
        if(isNullOrUndefined(kpimg.marTarget))
      {
        if(isNullOrUndefined(kpimg.febTarget))
      {
       if(isNullOrUndefined(kpimg.janTarget))
       {
       if(isNullOrUndefined(kpimg.decTarget))
       {
        if(isNullOrUndefined(kpimg.novTarget))
        {
         if(isNullOrUndefined(kpimg.octTarget))
         {
          if(isNullOrUndefined(kpimg.sepTarget))
          {
           if(isNullOrUndefined(kpimg.augTarget))
           {
            if(isNullOrUndefined(kpimg.julyTarget))
            {
              if(isNullOrUndefined(kpimg.juneTarget))
            {
              if(isNullOrUndefined(kpimg.mayTarget)){
                if(isNullOrUndefined(kpimg.aprilTarget)){
                  kpimg.Target=kpimg.marTarget;
                    this.target.push(kpimg.marTarget);
                  }
                  else{
                    kpimg.Target=kpimg.aprilTarget;
                    this.target.push(kpimg.aprilTarget);
                  }
              }
              else{
                kpimg.Target=kpimg.mayTarget;
                this.target.push(kpimg.mayTarget);
              }
            }
            else{
              kpimg.Target=kpimg.juneTarget;
              this.target.push(kpimg.juneTarget);
            }
            }
            else
            {
              kpimg.Target=kpimg.julyTarget;
              this.target.push(kpimg.julyTarget);
            }
  
           }
           else{
             kpimg.Target=kpimg.augTarget;
             this.target.push(kpimg.augTarget);
            }
          }
          else{
           kpimg.Target=kpimg.sepTarget;
           this.target.push(kpimg.sepTarget);
          }
         }
         else{
           kpimg.Target=kpimg.octTarget;
           this.target.push(kpimg.octTarget);
          }
        }
        else{
         kpimg.Target=kpimg.novTarget;
         this.target.push(kpimg.novTarget);
        }
       }
       else{
         kpimg.Target=kpimg.decTarget;
         this.target.push(kpimg.decTarget);
        }
      }
      else{
       kpimg.Target=kpimg.janTarget;
       this.target.push(kpimg.janTarget);
      }
     }
     else{
      kpimg.Target=kpimg.febTarget;
      this.target.push(kpimg.febTarget);
     }
    }
    else{
      kpimg.Target=kpimg.marTarget;
      this.target.push(kpimg.marTarget);
     }
    }

          console.log(kpimg);
          this.dataList.push(kpimg);
          this.dataListForFilter.push(kpimg);
        }
          
     });
    }
    debugger;
      this.loadLineChart(this.target, this.actual, this.label);
    this.showGraph = true;
    this.showReport= true;
  }
loadLineChart(target: any[], actual: any[], label: any[]){
  debugger;
  //var target1 = target.map(v => parseInt(v, 10));
  //var actual1 = actual.map(v => parseInt(v, 10));
  this.barChart = {
    labels: label,
    datasets: [
      {
        type:'bar',
        label: 'Target',
        data: target,
        fill: false,
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
      },
      {
        type:'bar',
        label: 'Target',
        data: actual,
        fill: false,
        backgroundColor: '#9CCC65',
        borderColor: '#7CB342',
      }
      // {
      //   label: 'Target',
      //   data: target1,
      //   backgroundColor: '#42A5F5',
      //     borderColor: '#1E88E5',
         
      // },
      // {
      //   label: 'Actual',
      //   data: actual1,
      //   backgroundColor: '#9CCC65',
      //   borderColor: '#7CB342',
       
      // }
    ]
  }
}

editactual(){
  //alert(this.displayedit);
  this.displayedit=true;
}

exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getdata());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "KPI_Monthly");
  });
}

getdata() {
let report = [];
for(let car of this.dataList) {
    //car.year = car.year.toString();
    report.push(car);
}
return report;
}

showErrormsg(msg: string) {
  const status: any = 'danger';
  this.toasterService.show('Error', msg, { preventDuplicates: true, duplicatesBehaviour: 'all', status });
}
showWarningmsg(msg: string) {
  const status: any = 'warning';
  this.toasterService.warning(msg, { preventDuplicates: true, duplicatesBehaviour: 'all', status });
}
showSuccessMsg(msg: string) {
  const status: any = 'success';
  this.toasterService.show(status, msg, { preventDuplicates: true, duplicatesBehaviour: 'all', status });
}
onSubmit() {
  debugger;
  const employeerole = JSON.parse(localStorage.getItem('EmployeeRole'));
  const employee = JSON.parse(localStorage.getItem('Employee'));

   this.employeeId= employee.EmployeeNo;
   this.selectedYear=this.valuedate.getFullYear();
  this.dataList.forEach(x => {
    x.UpdatedBy = employee.EmployeeNo;
    x.user="Admin";
    x.Year=this.selectedYear;
    x.Month=this.selectedMonth;
    x.DeptId=this.selectedDept;
    x.ID=x.KpiId;
    x.KpiId=parseInt(x.KpiId);
  })
 
  
  const value = this.dataList;
  console.log(this.dataList);
  
 
    // localStorage.setItem('datalist', JSON.stringify(this.dataList));
    debugger;
    this.allDataList=this.dataList;
    console.log(this.allDataList);
    this.kpiService.AddMonthlyKPIAdmin(this.dataList).subscribe(data => {
      this.showSuccessMsg(data);
      this.displayedit=false;
      this.loadKpiReport();
      
    },
      err => {
        this.showErrormsg(err.error.ExceptionMessage);
       
        //alert(this.employeeId);
        const employee = JSON.parse(localStorage.getItem('Employee'));
        // console.log(employee);
        this.employeeId= employee.EmployeeNo;
      });
  
  
}

saveAsExcelFile(buffer: any, fileName: string): void {
import("file-saver").then(FileSaver => {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
});
}


}


