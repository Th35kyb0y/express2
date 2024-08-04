import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopSidebarComponent } from './top-sidebar/top-sidebar.component';
import { SecuredPaymentsComponent } from './secured-payments/secured-payments.component';
import { ProductRecommendedComponent } from './product-recommended/product-recommended.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ExpertConsultingComponent } from './expert-consulting/expert-consulting.component';
import { AssuredDeliveryComponent } from './assured-delivery/assured-delivery.component';
import { PipeModule } from 'src/app/pipes/PipeModule';
import { RouterModule } from '@angular/router';
import { QuicklinkcomponentModule } from 'src/app/components/quicklinkcomponent/quicklinkcomponent.module';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { NotificationComponent } from 'src/app/view/notification/notification.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
 imports:      [ CommonModule,FormsModule,PipeModule,
    QuicklinkcomponentModule,NgbPopoverModule,
    RouterModule ],
 declarations: [
    TopSidebarComponent,SecuredPaymentsComponent,
    ProductRecommendedComponent,HeaderComponent,FooterComponent,ExpertConsultingComponent,AssuredDeliveryComponent, CustomerDashboardComponent,NotificationComponent, MobileHeaderComponent ],
    exports: [TopSidebarComponent,SecuredPaymentsComponent,
        ProductRecommendedComponent,HeaderComponent,MobileHeaderComponent,FooterComponent,ExpertConsultingComponent,AssuredDeliveryComponent ],

})
export class HomeLayoutComponentModule { }