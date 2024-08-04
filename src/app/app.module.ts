import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AboutUsComponent } from './view/about-us/about-us.component';
import { AppHomeComponent } from './view/app-home/app-home.component';
import { ApplicationAreaComponent } from './view/application-area/application-area.component';

import { CategorysComponent } from './view/categorys/categorys.component';
import { CheckoutComponent } from './view/checkout/checkout.component';
import { ContactComponent } from './view/contact/contact.component';
import { DeliveryOptionComponent } from './view/delivery-option/delivery-option.component';


import { HelpAndSupportComponent } from './view/help-and-support/help-and-support.component';
import { LoginComponent } from './view/login/login.component';

import { OrderSummaryComponent } from './view/order-summary/order-summary.component';

import { PrivacyPolicyComponent } from './view/privacy-policy/privacy-policy.component';



import { SegmentDetailComponent } from './view/segment-detail/segment-detail.component';
import { SegmentsComponent } from './view/segments/segments.component';
import { ServicesComponent } from './view/services/services.component';

import { SignupComponent } from './view/signup/signup.component';
import { TermsComponent } from './view/terms/terms.component';


import { INeedFireAuditForMyPremisesComponent } from './view/exp-types/i-need-fire-audit-for-my-premises/i-need-fire-audit-for-my-premises.component';
import { CqrsComponent } from './view/exp-types/i-need-fire-audit-for-my-premises/cqrs/cqrs.component';
import { CustomComponent } from './view/exp-types/i-need-fire-audit-for-my-premises/custom/custom.component';
import { INeedToProtectARiskComponent } from './view/exp-types/i-need-to-protect-a-risk/i-need-to-protect-a-risk.component';
import { INeedToProtectMyPremisesComponent } from './view/exp-types/i-need-to-protect-my-premises/i-need-to-protect-my-premises.component';
import { ExpTypesComponent } from './view/exp-types/exp-types.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreFetchService } from './services/pre.fetch.service';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { PipeModule } from './pipes/PipeModule';
import { CommercialKitchensComponent } from './view/ApplicationArea/commercial-kitchens/commercial-kitchens.component';
import { OfficesComponent } from './view/ApplicationArea/offices/offices.component';
import { ManufacturingComponent } from './view/ApplicationArea/manufacturing/manufacturing.component';
import { ServerRacksComponent } from './view/ApplicationArea/server-racks/server-racks.component';
import { ElectricalPanelsComponent } from './view/ApplicationArea/electrical-panels/electrical-panels.component';
import { WindTurbinesComponent } from './view/ApplicationArea/wind-turbines/wind-turbines.component';
import { CNCMachinesComponent } from './view/ApplicationArea/cncmachines/cncmachines.component';
import { VehicleEnginesComponent } from './view/ApplicationArea/vehicle-engines/vehicle-engines.component';
import { BatteryBanksComponent } from './view/ApplicationArea/battery-banks/battery-banks.component';
import { FumeCabinetsComponent } from './view/ApplicationArea/fume-cabinets/fume-cabinets.component';
import { GeneratorsComponent } from './view/ApplicationArea/generators/generators.component';
import { AppChatComponentModule } from './common/app-chat-assistance/app-chat-components.module';
import { sidebarComponentModule } from './common/user-layout/sidebar.module';
import { HomeLayoutComponentModule } from './common/home-layout/home-layout-components.module';
import { INeedToProtectMyPremisesAareaComponent } from './view/exp-types/i-need-to-protect-my-premises-aarea/i-need-to-protect-my-premises-aarea.component';import { RiskareaproductionComponent } from './view/HomeAreaSegment/riskareaproduction/riskareaproduction.component';
import { ProtectmypremisesComponent } from './view/HomeAreaSegment/protectmypremises/protectmypremises.component';
import { ProtectmypremisesdetailsComponent } from './view/HomeAreaSegment/protectmypremisesdetails/protectmypremisesdetails.component';
import { SharedModule } from './shared-module/shared.module';
import { ModelPopupsModule } from './model-popups/model-popups.module';
import { AppProductDetailsModule } from './view/ApplicationArea/app-product-details/app.product-details.module';
import { FireAuditForYourPremisesComponent } from './view/fire-audit-for-your-premises/fire-audit-for-your-premises.component';
import { ExpressProposalComponent } from './view/express-proposal/express-proposal/express-proposal.component';
import { CqrsInputsheetComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/cqrs-inputsheet.component';
import { BatteryBankComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/battery-bank/battery-bank.component';
import { CncMachineComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/cnc-machine/cnc-machine.component';
import { FumeHoodComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/fume-hood/fume-hood.component';
import { NetworkRackComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/network-rack/network-rack.component';
import { PrintingMachineComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/printing-machine/printing-machine.component';
import { ServerRackComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/server-rack/server-rack.component';
import { TransformerComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/transformer/transformer.component';
import { UpsComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/ups/ups.component';
import { VolvoBusComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/volvo-bus/volvo-bus.component';
import { GensetComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/genset/genset.component';
import { ElectricalPanelComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/electrical-panel/electrical-panel.component';
import { KitchenSuppressionSystemComponent } from './view/express-proposal/inputsheet/Kitchen Suppression Sytem/kitchen-suppression-system.component';
import { GasSuppressionSystemComponent } from './view/express-proposal/inputsheet/gas-suppression-system/gas-suppression-system.component';
import { ConfirmPopupComponent } from './view/express-proposal/inputsheet/confirm-popup/confirm-popup.component';
import { StartInputsheetComponent } from './view/start-inputsheet/start-inputsheet.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FireExtinguisherComponent } from './view/express-proposal/inputsheet/fire-extinguisher/fire-extinguisher.component';
import { ContactUsComponent } from './common/contact-us/contact-us.component';
import { ProposalSummaryComponent } from './view/express-proposal/proposal-summary/proposal-summary.component';
import { KitchenWiseComponent } from './view/express-proposal/inputsheet/kitchen-wise/kitchen-wise.component';

import { TreeDropdownComponent } from './view/express-proposal/inputsheet/tree-dropdown/tree-dropdown.component';
import { HomeandcarComponent } from './view/ApplicationArea/homeandcar/homeandcar.component';
import { ServerroomComponent } from './view/ApplicationArea/serverroom/serverroom.component';
import { OurStoryComponent } from './common/our-story/our-story.component';
import { ShippingReturnsComponent } from './common/shipping-returns/shipping-returns.component';
import { StorePolicyComponent } from './common/store-policy/store-policy.component';
import { ForumComponent } from './common/forum/forum.component';
import { FAQComponent } from './common/faq/faq.component';
import { appProductDetilsSegmentModule } from './view/ApplicationArea/app-product-detils-segment/app-product-detils-segment.module';
import { RefundPolicyComponent } from './common/refund-policy/refund-policy.component';
import { DesignModule } from './view/design/design.module';
import { CookiesPolicyComponent } from './common/cookies-policy/cookies-policy.component';
import { ApplicationAreaRishkAreaProtectionComponent } from './view/exp-types/application-area-rishk-area-protection/application-area-rishk-area-protection.component';
import { NotificationViewallComponent } from './view/notification/notification-viewall/notification-viewall.component';
import { OtherInputsheetComponent } from './view/express-proposal/inputsheet/cqrs-inputsheet/other-inputsheet/other-inputsheet.component';
import { CustomizedInputComponent } from './view/express-proposal/inputsheet/customized-input/customized-input.component';
import { AlertsModule } from './model-popups/alerts/alerts.module';
import { EnquiryComponent } from './common/Enquiry/enquiry.component';
import { AppMobileHomeComponent } from './view/app-home/app-mobile-home/app-mobile-home.component';
import { BlogComponent } from './view/blog/blog.component';
import { BlogViewerComponent } from './view/blog/blog-viewer/blog-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
KitchenSuppressionSystemComponent,
GasSuppressionSystemComponent,
// GasSuppressionSystemComponent,
    AboutUsComponent,
    AppHomeComponent,
    ApplicationAreaComponent,

    CategorysComponent,
    CheckoutComponent,
    ContactComponent,
    DeliveryOptionComponent,


    HelpAndSupportComponent,
    LoginComponent,

    OrderSummaryComponent,

    PrivacyPolicyComponent,


    SegmentDetailComponent,
    SegmentsComponent,
    ServicesComponent,

    SignupComponent,
    TermsComponent,



    INeedFireAuditForMyPremisesComponent,
    CqrsComponent,
    CustomComponent,
    INeedToProtectARiskComponent,
    INeedToProtectMyPremisesComponent,
    ExpTypesComponent,
    CommercialKitchensComponent,
    OfficesComponent,
    ManufacturingComponent,
    ServerRacksComponent,
    ElectricalPanelsComponent,
    WindTurbinesComponent,
    CNCMachinesComponent,
    VehicleEnginesComponent,
    BatteryBanksComponent,
    FumeCabinetsComponent,
    GeneratorsComponent,

    INeedToProtectMyPremisesAareaComponent,
    RiskareaproductionComponent,
    ProtectmypremisesComponent,
    ProtectmypremisesdetailsComponent,
    ExpressProposalComponent,
    CqrsInputsheetComponent,
    BatteryBankComponent,
    CncMachineComponent,
    FumeHoodComponent,
    NetworkRackComponent,
    PrintingMachineComponent,
    ServerRackComponent,
    TransformerComponent,
    UpsComponent,
    VolvoBusComponent,
    GensetComponent,
    ElectricalPanelComponent,
    FireAuditForYourPremisesComponent,
    ConfirmPopupComponent,
    StartInputsheetComponent,
    FireExtinguisherComponent,
    ContactUsComponent,
 ProposalSummaryComponent,
 KitchenWiseComponent,
 TreeDropdownComponent,
 HomeandcarComponent,
 ServerroomComponent,
 OurStoryComponent,
 ShippingReturnsComponent,
 StorePolicyComponent,
 ForumComponent,
 FAQComponent,
 RefundPolicyComponent,
 CookiesPolicyComponent,
 ApplicationAreaRishkAreaProtectionComponent,
 NotificationViewallComponent,
 OtherInputsheetComponent,
 CustomizedInputComponent,
 EnquiryComponent,
 AppMobileHomeComponent,
 BlogComponent,
 BlogViewerComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppChatComponentModule,
    sidebarComponentModule,
    HomeLayoutComponentModule,
    ModelPopupsModule,
    appProductDetilsSegmentModule,
    AppProductDetailsModule,
    BrowserAnimationsModule,
    DesignModule,

    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    SharedModule,
    AlertsModule
  ],
  providers: [
    PreFetchService,
    {
      provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigFactory,
      deps: [PreFetchService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function appConfigFactory(_PreFetchService: PreFetchService) {
  return (): Promise<any> => {
    return _PreFetchService.init()
  }
}
