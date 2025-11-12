import { Routes } from '@angular/router';
import { PatientRegistrationComponent } from '../../hms/patient-registration/patient-registration';
import { AppointmentSchedulingComponent } from '../../hms/appointment-scheduling/appointment-scheduling';
import { OpdComponent } from '../../hms/opd/opd';
import { IpdComponent } from '../../hms/ipd/ipd';
import { EmergencyComponent } from '../../hms/emergency/emergency';
import { EmrComponent } from '../../hms/emr/emr';
import { CpoeComponent } from '../../hms/cpoe/cpoe';
import { OtManagementComponent } from '../../hms/ot-management/ot-management';
import { QueueManagement } from '../../hms/queue-management/queue-management';

export const CLINICAL_ROUTES: Routes = [
    { path: 'patient-registration', component: PatientRegistrationComponent, data: { role: ['receptionist', 'admin'] } },
    { path: 'appointments', component: AppointmentSchedulingComponent, data: { role: ['receptionist', 'doctor', 'admin'] } },
    { path: 'opd', component: OpdComponent, data: { role: ['doctor', 'nurse', 'admin'] } },
    { path: 'ipd', component: IpdComponent, data: { role: ['doctor', 'nurse', 'admin'] } },
    { path: 'emergency', component: EmergencyComponent, data: { role: ['doctor', 'nurse', 'receptionist', 'admin'] } },
    { path: 'emr', component: EmrComponent, data: { role: ['doctor', 'nurse', 'admin'] } },
    { path: 'cpoe', component: CpoeComponent, data: { role: ['doctor', 'nurse', 'labtech', 'pharmacist', 'admin'] } },
    { path: 'ot-management', component: OtManagementComponent, data: { role: ['doctor', 'nurse', 'admin'] } },
    { path: 'queue-management', component: QueueManagement, data: { role: ['receptionist', 'admin'] } },
    { path: '', redirectTo: 'opd', pathMatch: 'full' } // default for /clinical
];
