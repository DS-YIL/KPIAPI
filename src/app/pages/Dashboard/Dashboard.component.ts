import { Component, OnInit } from '@angular/core';
import { KPIService } from '../KPI/KPI.service';
import { FormBuilder } from '@angular/forms';
import { KpiModel ,TopKpiModel} from '../KPI/KPI.model';
import { isNullOrUndefined } from 'util';
import { NbToastrService } from '@nebular/theme';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  data: TopKpiModel[]=[];
  dataList: TopKpiModel[];
  cols: any[];
  displayDialog: boolean = false;
  displayJan:boolean=false;
  displayFeb:boolean=false;
  displayMar:boolean=false;
  displayApr:boolean=false;
  displayMay:boolean=false;
  displayJun:boolean=false;
  displayJul:boolean=false;
  displayAug:boolean=false;
  displaySep:boolean=false;
  displayOct:boolean=false;
  displayNov:boolean=false;
  displayDec:boolean=false;
  submitkpi:boolean=false;
  resetkpi:boolean=true;
  constructor(
    private kpiService: KPIService, private formBuilder: FormBuilder, private toasterService: NbToastrService) {

   
  }

  ngOnInit() {
    this.loadKpiReport();
    this.cols = [
      { field: 'DeptName', header: 'Department' },
      { field: 'CWQPNo', header: 'CWQP No' },
      { field: 'QualityIndices', header: 'Quality Indices' },
      { field: 'Criteria', header: 'Criteria' },
      { field: 'Measurment', header: 'Measurement' },
      {field:'Purpose', header:'Purpose'},
      { field: 'Target', header: 'Target' },
      { field: 'aprTarget', header: 'New Target' },
      { field: 'mayTarget', header: 'New Target' },
      { field: 'junTarget', header: 'New Target' },
      { field: 'julTarget', header: 'New Target' },
      { field: 'augTarget', header: 'New Target' },
      { field: 'sepTarget', header: 'New Target' },
      { field: 'octTarget', header: 'New Target' },
      { field: 'novTarget', header: 'New Target' },
      { field: 'decTarget', header: 'New Target' },
      { field: 'janTarget', header: 'New Target' },
      { field: 'febTarget', header: 'New Target' },
      { field: 'marTarget', header: 'New Target' },
      

      // { field: 'July', header: 'Actual' }
  ];
  }
  showDialog() {
    this.displayDialog = true;
}
  // loadKpiReport() {
  //   this.kpiService.getAllKpi().subscribe(x => {
  //    // this.data = x;
  //     this.dataList=x;
  //   });
  // }

  hideDialog()
  {
    this.displayDialog = false;
  }


  loadKpiReport() {
    debugger;
    this.kpiService.getmgtkpi().subscribe(x => {
      this.dataList=x;
      this.submitkpi=true;
      this.resetkpi=false;
      if(this.dataList.length==0)
      {
        this.kpiService.getAllTopKpi().subscribe(x => {
           this.dataList=x;
           this.submitkpi=false;
           this.resetkpi=true;
        });
      }
      if(this.dataList[0].janTarget!= null && this.dataList[0].janTarget!="")
      {
        this.dataList[0].display=true;
        this.displayJan=true;
      }
      if(this.dataList[0].febTarget!= null && this.dataList[0].febTarget!="")
      {
        this.dataList[0].display=true;
        this.displayFeb=true;
      }
      if(this.dataList[0].marTarget!= null && this.dataList[0].marTarget!="")
      {
        this.dataList[0].display=true;
        this.displayMar=true;
      }
      if(this.dataList[0].aprTarget!= null && this.dataList[0].aprTarget!="")
      {
        this.dataList[0].display=true;
        this.displayApr=true;
      }
      if(this.dataList[0].mayTarget!= null && this.dataList[0].mayTarget!="")
      {
        this.dataList[0].display=true;
        this.displayMay=true;
      }
      if(this.dataList[0].junTarget!= null && this.dataList[0].junTarget!="")
      {
        this.dataList[0].display=true;
        this.displayJun=true;
      }
      if(this.dataList[0].julTarget!= null && this.dataList[0].julTarget!="")
      {
        this.dataList[0].display=true;
        this.displayJul=true;
      }
      if(this.dataList[0].augTarget!= null && this.dataList[0].augTarget!="")
      {
        this.dataList[0].display=true;
        this.displayAug=true;
      }
      if(this.dataList[0].sepTarget!= null && this.dataList[0].sepTarget!="")
      {
        this.dataList[0].display=true;
        this.displaySep=true;
      }
      if(this.dataList[0].octTarget!= null && this.dataList[0].octTarget!="")
      {
        this.dataList[0].display=true;
        this.displayOct=true;
      }
      if(this.dataList[0].novTarget!= null && this.dataList[0].novTarget!="")
      {
        this.dataList[0].display=true;
        this.displayNov=true;
      }
      if(this.dataList[0].decTarget!= null && this.dataList[0].decTarget!="")
      {
        this.dataList[0].display=true;
        this.displayDec=true;
      }

     });
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

  resetKPI()
  {
    this.kpiService.resetkpi().subscribe(x => {
if(x=="success")
{
  this.loadKpiReport();
  this.resetkpi=true;
  this.submitkpi=false;
}
    });
  }

  UpdateSelectedKPI()
  {
    this.kpiService.submitmgtkpi(this.data).subscribe(x => {

       if(x=="success")
       {
         this.displayDialog=false;
this.data=[];
         this.showSuccessMsg("Management KPI Updated Successfully");
         this.submitkpi=true;
         this.resetkpi=false;
         this.kpiService.getmgtkpi().subscribe(x => {
          this.dataList=x;
         });

       }

       
    });
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getdata());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "KPI_PendingApprovals");
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
