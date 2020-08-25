import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {ApiService} from './api.service'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConnectComponent } from './connect/connect.component';
import { AllTestsComponent } from './all-tests/all-tests.component';
import { RunBuildComponent } from './run-build/run-build.component';
import { ReportsComponent } from './reports/reports.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageReportsComponent } from './manage-reports/manage-reports.component';
import { AddEnvironmentComponent } from './add-environment/add-environment.component';
import { AddNewTestComponent } from './add-new-test/add-new-test.component';
import { AddUserComponent } from './add-user/add-user.component';
import { BuildDetailsComponent } from './build-details/build-details.component';
import { BuildOverViewComponent } from './build-over-view/build-over-view.component';
import { BuildStopComponent } from './build-stop/build-stop.component';
import { ViewReportsComponent } from './view-reports/view-reports.component';
import { from } from 'rxjs';
import { TestDetailsComponent } from './test-details/test-details.component';
import { TestHistoryComponent } from './test-history/test-history.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DeepAnalysisComponent } from './deep-analysis/deep-analysis.component';
import { ViewReportsAdminComponent } from './view-reports-admin/view-reports-admin.component';
import { RunBuildAdminComponent } from './run-build-admin/run-build-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AllTestsAdminComponent } from './all-tests-admin/all-tests-admin.component';
import { NgApexchartsModule } from "ng-apexcharts";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnectComponent,
    AllTestsComponent,
    RunBuildComponent,
    ReportsComponent,
    ManageUsersComponent,
    ManageReportsComponent,
    AddEnvironmentComponent,
    AddNewTestComponent,
    AddUserComponent,
    BuildDetailsComponent,
    BuildOverViewComponent,
    BuildStopComponent,
    ViewReportsComponent,
    TestDetailsComponent,
    TestHistoryComponent,
    UserDetailsComponent,
    DeepAnalysisComponent,
    ViewReportsAdminComponent,
    RunBuildAdminComponent,
    HomeAdminComponent,
    AllTestsAdminComponent,
  ],
  imports: [
    HttpClientModule,
    // HttpClient,
    BrowserModule,
    NgApexchartsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ConnectComponent },
      { path: 'home', component: HomeComponent },
      { path: 'allTest', component: AllTestsComponent },
      { path: 'runBuild', component: RunBuildComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'users', component:  ManageUsersComponent },
      { path: 'managereports', component: ManageReportsComponent },
      { path: 'addEnvironment', component: AddEnvironmentComponent },
      { path: 'addTest', component: AddNewTestComponent },
      { path: 'addUser', component: AddUserComponent },
      { path: 'buildDetails', component: BuildDetailsComponent },
      { path: 'buildOverView', component: BuildOverViewComponent },
      { path: 'buildStop', component: BuildStopComponent },
      { path: 'viewReports', component: ViewReportsComponent },
      { path: 'userDetails/:id', component: UserDetailsComponent },
      { path: 'testDetails', component: TestDetailsComponent },
      { path: 'testHistory', component:TestHistoryComponent },
      { path: 'deepAnalysis', component: DeepAnalysisComponent },
      { path: 'viewReportsAdmin', component: ViewReportsAdminComponent },
      { path: 'runBuildAdmin', component: RunBuildAdminComponent },
      { path: 'homeAdmin', component: HomeAdminComponent },
      { path: 'allTestsAdmin', component: AllTestsAdminComponent },
    ])
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
