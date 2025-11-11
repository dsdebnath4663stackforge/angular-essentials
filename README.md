 

---

### 🏥 **Hospital Management System — RBAC Test Matrix**

| Module                              | Route                   | Allowed Roles                             | ✅ Positive Test Case (Expected: Access Granted)                                                                                          | ❌ Negative Test Case (Expected: Access Denied)                                                                                 |
| ----------------------------------- | ----------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Patient Registration**            | `/patient-registration` | receptionist, admin                       | Login as **Receptionist Meena ([receptionist@example.com](mailto:receptionist@example.com))** → Should access patient registration form. | Login as **Lab Technician Ravi ([labtech@example.com](mailto:labtech@example.com))** → Should get "Access Denied" or redirect. |
| **Appointments & Scheduling**       | `/appointments`         | receptionist, doctor, admin               | **Dr. Priya Sharma ([doctor@example.com](mailto:doctor@example.com))** → Should view appointments list.                                  | **Billing Executive Suresh ([billing@example.com](mailto:billing@example.com))** → Should be denied.                           |
| **OPD (Outpatient)**                | `/opd`                  | doctor, nurse, admin                      | **Nurse Anita Roy ([nurse@example.com](mailto:nurse@example.com))** → Should view OPD patient list.                                      | **Receptionist Meena ([receptionist@example.com](mailto:receptionist@example.com))** → Should not access OPD.                  |
| **IPD (Inpatient)**                 | `/ipd`                  | doctor, nurse, admin                      | **Dr. Priya Sharma ([doctor@example.com](mailto:doctor@example.com))** → Can admit or discharge patients.                                | **Pharmacist Kiran ([pharmacist@example.com](mailto:pharmacist@example.com))** → Access denied.                                |
| **Emergency & Trauma**              | `/emergency`            | doctor, nurse, receptionist, admin        | **Receptionist Meena ([receptionist@example.com](mailto:receptionist@example.com))** → Should register emergency cases.                  | **Billing Executive Suresh ([billing@example.com](mailto:billing@example.com))** → Denied.                                     |
| **EMR (Electronic Medical Record)** | `/emr`                  | doctor, nurse, admin                      | **Dr. Priya Sharma ([doctor@example.com](mailto:doctor@example.com))** → Can view and update EMR.                                        | **Lab Technician Ravi ([labtech@example.com](mailto:labtech@example.com))** → Cannot access.                                   |
| **CPOE (Physician Orders)**         | `/cpoe`                 | doctor, nurse, labtech, pharmacist, admin | **Pharmacist Kiran ([pharmacist@example.com](mailto:pharmacist@example.com))** → Can view doctor orders for dispensing.                  | **Billing Executive Suresh ([billing@example.com](mailto:billing@example.com))** → Denied.                                     |
| **Pharmacy**                        | `/pharmacy`             | pharmacist, admin                         | **Pharmacist Kiran ([pharmacist@example.com](mailto:pharmacist@example.com))** → Can manage drug inventory and dispensing.               | **Receptionist Meena ([receptionist@example.com](mailto:receptionist@example.com))** → Access denied.                          |
| **Laboratory (LIS)**                | `/laboratory`           | labtech, doctor, admin                    | **Lab Technician Ravi ([labtech@example.com](mailto:labtech@example.com))** → Can process lab test orders.                               | **Billing Executive Suresh ([billing@example.com](mailto:billing@example.com))** → Denied.                                     |
| **Radiology (RIS)**                 | `/radiology`            | labtech, doctor, admin                    | **Dr. Priya Sharma ([doctor@example.com](mailto:doctor@example.com))** → Can view and order scans.                                       | **Pharmacist Kiran ([pharmacist@example.com](mailto:pharmacist@example.com))** → Denied.                                       |
| **OT Management**                   | `/ot-management`        | doctor, nurse, admin                      | **Nurse Anita Roy ([nurse@example.com](mailto:nurse@example.com))** → Can update pre-op checklist.                                       | **Receptionist Meena ([receptionist@example.com](mailto:receptionist@example.com))** → Denied.                                 |
| **Billing & Invoicing**             | `/billing`              | billing, admin                            | **Billing Executive Suresh ([billing@example.com](mailto:billing@example.com))** → Can generate invoices.                                | **Dr. Priya Sharma ([doctor@example.com](mailto:doctor@example.com))** → Denied.                                               |
| **Inventory Management**            | `/inventory`            | admin                                     | **IT Admin Rohan ([admin@example.com](mailto:admin@example.com))** → Can manage stock and reorders.                                      | **Nurse Anita Roy ([nurse@example.com](mailto:nurse@example.com))** → Denied.                                                  |
| **Master Config / Admin Console**   | `/master-config`        | admin                                     | **IT Admin Rohan ([admin@example.com](mailto:admin@example.com))** → Can configure departments, charges, etc.                            | **Pharmacist Kiran ([pharmacist@example.com](mailto:pharmacist@example.com))** → Denied.                                       |
| **RBAC & Audit Logs**               | `/rbac-audit`           | admin                                     | **IT Admin Rohan ([admin@example.com](mailto:admin@example.com))** → Can view audit logs and modify roles.                               | **Dr. Priya Sharma ([doctor@example.com](mailto:doctor@example.com))** → Denied.                                               |
| **Reports & Analytics**             | `/reports-analytics`    | admin                                     | **IT Admin Rohan ([admin@example.com](mailto:admin@example.com))** → Should access analytics dashboard.                                  | **Receptionist Meena ([receptionist@example.com](mailto:receptionist@example.com))** → Denied.                                 |
| **Patient Portal**                  | `/patient-portal`       | patient, admin                            | Create new **Patient user (signup)** → Should access own medical data.                                                                   | **Dr. Priya Sharma ([doctor@example.com](mailto:doctor@example.com))** → Denied.                                               |
| **Queue Management**                | `/queue-management`     | receptionist, admin                       | **Receptionist Meena ([receptionist@example.com](mailto:receptionist@example.com))** → Should manage OPD queues.                         | **Lab Technician Ravi ([labtech@example.com](mailto:labtech@example.com))** → Denied.                                          |
| **Notifications**                   | `/notifications`        | admin                                     | **IT Admin Rohan ([admin@example.com](mailto:admin@example.com))** → Can configure SMS/email alerts.                                     | **Nurse Anita Roy ([nurse@example.com](mailto:nurse@example.com))** → Denied.                                                  |
| **Feedback & CRM**                  | `/feedback-crm`         | admin                                     | **IT Admin Rohan ([admin@example.com](mailto:admin@example.com))** → Can view patient feedbacks.                                         | **Billing Executive Suresh ([billing@example.com](mailto:billing@example.com))** → Denied.                                     |

---

### 🧩 How to Test Role Guards (`AuthGuard` + `RoleGuard`)

1. **Login Simulation**

   * Use each test user’s credentials (`email`, `password`) to log in.
   * The system stores token & role in `localStorage` (or session storage).

2. **Navigate to each route manually**

   * Example: after login as `receptionist@example.com`, try `/billing`.
   * Expected → Redirect to `/unauthorized` or show “Access Denied”.

3. **Automated Route Testing (Angular Example)**

   ```bash
   ng g c pages/patient-registration
   ng g c pages/appointments
   ng g c pages/opd
   ...
   ng g c pages/feedback-crm
   ```

4. **Use in `app-routing.module.ts`:**

   ```ts
   {
     path: 'patient-registration',
     component: PatientRegistrationComponent,
     canActivate: [AuthGuard, RoleGuard],
     data: { roles: ['receptionist', 'admin'] }
   },
   {
     path: 'billing',
     component: BillingComponent,
     canActivate: [AuthGuard, RoleGuard],
     data: { roles: ['billing', 'admin'] }
   }
   ```

5. **Expected Outputs:**

   * ✅ Authorized roles → Access page content.
   * ❌ Unauthorized → Redirect to `/unauthorized` page.

---

Would you like me to generate the **Angular route commands + dummy Tailwind pages** automatically for these 20 modules (so you can copy-paste them directly)?
