import { Routes } from '@angular/router';
import { LaboratoryComponent } from '../../hms/laboratory/laboratory';
import { RadiologyComponent } from '../../hms/radiology/radiology';
import { PharmacyComponent } from '../../hms/pharmacy/pharmacy';

export const DIAGNOSTICS_ROUTES: Routes = [
    { path: 'laboratory', component: LaboratoryComponent, data: { role: ['labtech', 'doctor', 'admin'] } },
    { path: 'radiology', component: RadiologyComponent, data: { role: ['labtech', 'doctor', 'admin'] } },
    { path: 'pharmacy', component: PharmacyComponent, data: { role: ['pharmacist', 'admin'] } },
    { path: '', redirectTo: 'laboratory', pathMatch: 'full' }
];
