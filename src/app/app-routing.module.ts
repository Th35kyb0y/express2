import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './view/app-home/app-home.component';
import { CategorysComponent } from './view/categorys/categorys.component';
import { SegmentsComponent } from './view/segments/segments.component';


import { CheckoutComponent } from './view/checkout/checkout.component';

import { HelpAndSupportComponent } from './view/help-and-support/help-and-support.component';

import { TermsComponent } from './view/terms/terms.component';


import { FaqComponent } from './view/faq/faq.component';
import { LoginComponent } from './view/login/login.component';

import { DeliveryOptionComponent } from './view/delivery-option/delivery-option.component';
import { OrderSummaryComponent } from './view/order-summary/order-summary.component';
import { ApplicationAreaComponent } from './view/application-area/application-area.component';
import { ContactComponent } from './view/contact/contact.component';

import { SignupComponent } from './view/signup/signup.component';
import { SegmentDetailComponent } from './view/segment-detail/segment-detail.component';


import { INeedFireAuditForMyPremisesComponent } from './view/exp-types/i-need-fire-audit-for-my-premises/i-need-fire-audit-for-my-premises.component';
import { INeedToProtectARiskComponent } from './view/exp-types/i-need-to-protect-a-risk/i-need-to-protect-a-risk.component';
import { INeedToProtectMyPremisesComponent } from './view/exp-types/i-need-to-protect-my-premises/i-need-to-protect-my-premises.component';
import { CqrsComponent } from './view/exp-types/i-need-fire-audit-for-my-premises/cqrs/cqrs.component';
import { CustomComponent } from './view/exp-types/i-need-fire-audit-for-my-premises/custom/custom.component';


import { AboutUsComponent } from './view/about-us/about-us.component';
import { ServicesComponent } from './view/services/services.component';
import { PrivacyPolicyComponent } from './view/privacy-policy/privacy-policy.component';
import { AssuredDeliveryComponent } from './common/home-layout/assured-delivery/assured-delivery.component';
import { ExpTypesComponent } from './view/exp-types/exp-types.component';
import { SecuredPaymentsComponent } from './common/home-layout/secured-payments/secured-payments.component';
import { ExpertConsultingComponent } from './common/home-layout/expert-consulting/expert-consulting.component';
import { CommercialKitchensComponent } from './view/ApplicationArea/commercial-kitchens/commercial-kitchens.component';
import { CNCMachinesComponent } from './view/ApplicationArea/cncmachines/cncmachines.component';
import { BatteryBanksComponent } from './view/ApplicationArea/battery-banks/battery-banks.component';
import { ElectricalPanelsComponent } from './view/ApplicationArea/electrical-panels/electrical-panels.component';
import { FumeCabinetsComponent } from './view/ApplicationArea/fume-cabinets/fume-cabinets.component';
import { GeneratorsComponent } from './view/ApplicationArea/generators/generators.component';
import { ManufacturingComponent } from './view/ApplicationArea/manufacturing/manufacturing.component';
import { OfficesComponent } from './view/ApplicationArea/offices/offices.component';
import { ServerRacksComponent } from './view/ApplicationArea/server-racks/server-racks.component';
import { VehicleEnginesComponent } from './view/ApplicationArea/vehicle-engines/vehicle-engines.component';
import { WindTurbinesComponent } from './view/ApplicationArea/wind-turbines/wind-turbines.component';
import { INeedToProtectMyPremisesAareaComponent } from './view/exp-types/i-need-to-protect-my-premises-aarea/i-need-to-protect-my-premises-aarea.component';
import { RiskareaproductionComponent } from './view/HomeAreaSegment/riskareaproduction/riskareaproduction.component';
import { ExpressProposalComponent } from './view/express-proposal/express-proposal/express-proposal.component';
import { FireAuditForYourPremisesComponent } from './view/fire-audit-for-your-premises/fire-audit-for-your-premises.component';
import { CSAuthGuard } from './services/cs-auth.guard';
import { StartInputsheetComponent } from './view/start-inputsheet/start-inputsheet.component';
import { ContactUsComponent } from './common/contact-us/contact-us.component';
import { ProposalSummaryComponent } from './view/express-proposal/proposal-summary/proposal-summary.component';
import { ServerroomComponent } from './view/ApplicationArea/serverroom/serverroom.component';
import { HomeandcarComponent } from './view/ApplicationArea/homeandcar/homeandcar.component';
import { OurStoryComponent } from './common/our-story/our-story.component';
import { ShippingReturnsComponent } from './common/shipping-returns/shipping-returns.component';
import { StorePolicyComponent } from './common/store-policy/store-policy.component';
import { ForumComponent } from './common/forum/forum.component';
import { FAQComponent } from './common/faq/faq.component';
import { CustomerDashboardComponent } from './common/home-layout/customer-dashboard/customer-dashboard.component';
import { RefundPolicyComponent } from './common/refund-policy/refund-policy.component';
import { CookiesPolicyComponent } from './common/cookies-policy/cookies-policy.component';
import { ApplicationAreaRishkAreaProtectionComponent } from './view/exp-types/application-area-rishk-area-protection/application-area-rishk-area-protection.component';
import { USERAuthGuard } from './services/user-auth.guard';
import { NotificationViewallComponent } from './view/notification/notification-viewall/notification-viewall.component';
import { EnquiryComponent } from './common/Enquiry/enquiry.component';
import { BlogViewerComponent } from './view/blog/blog-viewer/blog-viewer.component';

const routes: Routes = [
  { path: '', component: AppHomeComponent, data: { isMainPage:true } },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () => import('./view/products/products.module').then( m => m.ProductsModule)
  },
  {
    path: 'search-product',
    loadChildren: () => import('./view/product-search/product-search.module').then( m => m.ProductSearchModule)
  },
  {
    path: 'products/:name',
    loadChildren: () => import('./view/products/products.module').then( m => m.ProductsModule)
  },

  {
    path: 'customer-dashboard',
    component:CustomerDashboardComponent,
    canActivate: [USERAuthGuard]
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./view/product-detail/product-detail.module').then( m => m.ProductDetailsModule)
  },
  // {
  //   path: 'cs',
  //   loadChildren: () => import('./view/cs/cs.module').then( m => m.CsModule),
  //   canActivate: [CSAuthGuard]
  // },
  {
    path: 'product-detail/:productname',
    loadChildren: () => import('./view/product-detail/product-detail.module').then( m => m.ProductDetailsModule)
  },
  {
    path: 'products/category/:categoryname/sub-category/:subcategoryname',
    loadChildren: () => import('./view/products/products.module').then( m => m.ProductsModule)
  },
  // { path: 'products/category/:categoryname/sub-category/:subcategoryname', component: ProductsComponent },
  // { path: 'product-detail', component: ProductDetailComponent },
  // { path: 'product-detail/:productname', component: ProductDetailComponent },
  { path: 'categorys', component: CategorysComponent },
  { path: 'category', component: CategorysComponent },
  { path: 'category/:categoryname', component: CategorysComponent },
  { path: 'category/:categoryname/:id', component: CategorysComponent },
  { path: 'segments', component: SegmentsComponent },
  { path: 'segments/:segmentname', component: SegmentDetailComponent },
  { path: 'category/:categoryname', component: SegmentDetailComponent },
  { path: 'category/:categoryname/:id', component: SegmentDetailComponent },
  { path: 'areas', component: ApplicationAreaComponent },
  { path: 'Applicationareas/CommercialKitchens', component: CommercialKitchensComponent },
  { path: 'Applicationareas/CNCMachines', component: CNCMachinesComponent },
  { path: 'Applicationareas/BatteryBanks', component: BatteryBanksComponent },
  { path: 'Applicationareas/ElectricalPanels', component: ElectricalPanelsComponent },
  { path: 'Applicationareas/FumeCabinets', component: FumeCabinetsComponent },
  { path: 'Applicationareas/Generators', component: GeneratorsComponent },
  { path: 'Applicationareas/Manufacturing', component: ManufacturingComponent },
  { path: 'Applicationareas/Offices', component: OfficesComponent },
  { path: 'Applicationareas/ServerRacks', component: ServerRacksComponent },
  { path: 'Applicationareas/VehicleEngines', component: VehicleEnginesComponent },
  { path: 'Applicationareas/WindTurbines', component: WindTurbinesComponent },


//
  { path: 'Applicationareas/HormeandCar', component: HomeandcarComponent },



  { path: 'Applicationareas/serverroom', component: ServerroomComponent },
  { path: 'OurStory', component: OurStoryComponent },
  { path: 'Terms-Condition', component: ShippingReturnsComponent },
  { path: 'StorePolicy', component: StorePolicyComponent },
  { path: 'PrivacyPolicy', component: ForumComponent },
  { path: 'TermsService', component: FAQComponent },
  { path: 'CookiesPolicy', component: CookiesPolicyComponent },
  {
    path: 'user',
    loadChildren: () => import('./view/user/user.module').then( m => m.UserModule),
    canActivate: [USERAuthGuard]
  },
  {
    path: 'payment-init',
    loadChildren: () => import('./view/user/payment-init/payment-init.module').then( m => m.PaymentInitModule)
  },
  {
    path: 'Payment-link',
    loadChildren: () => import('./view/payment-link/payment-link.module').then( m => m.PaymentLinkModule)
  },
  {
    path: 'payment-response',
    loadChildren: () => import('./view/payment-success-response/payment-success-response.module').then( m => m.PaymentSuccessResponseModule)
  },
  {
    path: 'payment-failure',
    loadChildren: () => import('./view/payment-failure-response/payment-failure-response.module').then( m => m.PaymentFailureResponseModule)
  },
  {
    path: 'Reset-Password',
    loadChildren: () => import('./view/reset-password/reset-password.module').then( m => m.ResetPasswordModule)
  },
  {
    path: 'design',
    loadChildren: () => import('../app/view/design/design.module').then( m => m.DesignModule)
  },
  {
    path: 'green-solution',
    loadChildren: () => import('../app/components/common/green-solution/green-solution.module').then( m => m.GreenSolutionModule)
  },

  {
    path: 'myLibrary',
    loadChildren: () => import('../app/view/my-library/my-library.module').then( m => m.MyLibraryModule)
  },

  {
    path: 'specificPremises',
    loadChildren: () => import('../app/view/specific-premises/specific-premises.module').then( m => m.SpecificPremisesModule)
  },
  {
    path: 'virtualAssistant',
    loadChildren: () => import('../app/view/virtualAssistant/virtual-assistant.module').then( m => m.VirtualAssistantModule)
  },
  {
    path: 'rightSideButton',
    loadChildren: () => import('../app/view/mainDashboardRightSideButton/main-dashboard-rightside-button.module').then( m => m.MainDashboardRightsideButtonModule)
  },
  {
    path: 'cs',
    loadChildren: () => import('../app/view/CustomerSupportDashboard/customer-support-dashboard.module').then( m => m.CustomerSupportDashboardModule),
    canActivate: [CSAuthGuard]
  },
  // {
  //   path: 'CSDashboard',
  //   loadChildren: () => import('../app/view/CustomerSupportDashboard/customer-support-dashboard.module').then( m => m.CustomerSupportDashboardModule)
  // },

  // {
  //   path: 'faq',
  //   loadChildren: () => import('../app/view/faq/faq.module').then( m => m.FaqModule)
  // },


  {
    path: 'myOffers',
    loadChildren: () => import('../app/view/my-offers/my-offers.module').then( m => m.MyOffersModule),
    canActivate: [USERAuthGuard]
  },

  {
    path: 'myPurchaseHistory',
    loadChildren: () => import('../app/view/my-purchase-history/my-purchase-history.module').then( m => m.MyPurchaseHistoryModule),
    canActivate: [USERAuthGuard]
  },
 // { path: 'user/profile', component: ProfileComponent },
 // { path: 'user/order', component: OrderComponent },
  //{ path: 'proposal', component: ProposalComponent },
  // { path: 'user/billing-address', component: BillingAddressComponent },
  //{ path: 'user/profile', component: ProfileComponent },
  //{ path: 'user/order', component: OrderComponent },
 // { path: 'proposal', component: ProposalComponent },
  { path: 'eproposal', component: ExpressProposalComponent },
  { path: 'eproposal-summary', component: ProposalSummaryComponent },

  //{ path: 'user/billing-address', component: BillingAddressComponent },
  { path: 'user/checkout', component: CheckoutComponent,
  canActivate: [USERAuthGuard] },
  //{ path: 'user/address', component: UserAddressComponent },
 // { path: 'user/whishlist', component: WishlistComponent },
  //{ path: 'user/gift-card-coupon', component: GiftCardCouponComponent },
 // { path: 'user/refer-earn', component: ReferAndEarnComponent },
  //{ path: 'user/rating-review', component: RatingReviewComponent },
  //{ path: 'user/payment-credit', component: PaymentCreditComponent },
  // { path: 'user/shipping-address', component: ShippingAddressComponent },
  { path: 'user/delivery-option', component: DeliveryOptionComponent },
  { path: 'user/order-summary', component: OrderSummaryComponent },
  //{ path: 'user/faq', component: UserFaqComponent },
  //{ path: 'user/help-support', component: UserHelpSupportComponent },
 // { path: 'user/terms', component: UserTermsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'help-support', component: HelpAndSupportComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'assured-delivery', component: AssuredDeliveryComponent },
  { path: 'secured-payments', component: SecuredPaymentsComponent },
  { path: 'expert-consulting', component: ExpertConsultingComponent },
  { path: 'exp-type/i-need-fire-audit-for-my-premises', component: INeedFireAuditForMyPremisesComponent },
  { path: 'exp-type/i-need-fire-audit-for-my-premises/cqrs', component: CqrsComponent },
  { path: 'exp-type/i-need-fire-audit-for-my-premises/custom', component: CustomComponent },
  { path: 'exp-type/i-need-to-protect-a-risk/:itemname/shop', component: INeedToProtectARiskComponent },


  { path: 'exp-type/i-need-to-protect-my-premises/:itemname/shop', component: INeedToProtectMyPremisesComponent },
  { path: 'exp-type/i-need-to-protect-my-premises-Details/:itemname/shop', component: INeedToProtectMyPremisesAareaComponent },


  { path: 'appAreaneedToProtect', component: ApplicationAreaRishkAreaProtectionComponent },

  { path: 'expert-consulting', component: ExpertConsultingComponent },
  { path: 'expert-consulting', component: ExpertConsultingComponent },
  { path: 'riskareaprotect', component: RiskareaproductionComponent },
  { path: 'FireAuditForYourPremises', component: FireAuditForYourPremisesComponent },
  { path: 'StartInput', component: StartInputsheetComponent },
  { path: 'ContactUs', component: ContactUsComponent },
  { path: 'Enquiry', component: EnquiryComponent },
  { path: 'Refund-Policy', component: RefundPolicyComponent },

  { path: 'exp-type/:urlType', component: ExpTypesComponent },
  { path: 'notifications', component: NotificationViewallComponent },
  { path: 'view/:url', component: BlogViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

