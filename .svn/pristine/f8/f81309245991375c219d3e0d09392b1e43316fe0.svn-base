import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'shipping-address',
    loadChildren: () => import('./shipping-address/shipping-address.module').then( m => m.ShippingAddressModule)
  },
  {
    path: 'billing-address',
    loadChildren: () => import('./billing-address/billing-address.module').then( m => m.BillingAddressModule)
  },
  {
    path: 'order-summary-bycart',
    loadChildren: () => import('./order-summar-by-cart/order-summar-by-cart.module').then( m => m.OrderSummarByCartModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./../order/order.module').then( m => m.OrderModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./../profile/profile.module').then( m => m.ProfileModule)
  },
  {
    path: 'proposal',
    loadChildren: () => import('./../proposal/proposal.module').then( m => m.ProposalModule)
  },
  {
    path: 'design',
    loadChildren: () => import('./../design/design.module').then( m => m.DesignModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./../user-address/user-address.module').then( m => m.UserAddressModule)
  },
  {
    path: 'help-support',
    loadChildren: () => import('./../user-help-support/user-help-support.module').then( m => m.UserHelpSupportModule)
  },
  {
    path: 'whishlist',
    loadChildren: () => import('./../wishlist/wishlist.module').then( m => m.WishlistModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./../user-terms/user-terms.module').then( m => m.UserTermsModule)
  },
  {
    path: 'gift-card-coupon',
    loadChildren: () => import('./../gift-card-coupon/gift-card-coupon.module').then( m => m.GiftCardCouponModule)
  },
  {
    path: 'refer-earn',
    loadChildren: () => import('./../refer-and-earn/refer-and-earn.module').then( m => m.ReferAndEarnModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./../user-faq/user-faq.module').then( m => m.UserFaqModule)
  },
  {
    path: 'rating-review',
    loadChildren: () => import('./../rating-review/rating-review.module').then( m => m.RatingReviewModule)
  },
  {
    path: 'payment-credit',
    loadChildren: () => import('./../payment-credit/payment-credit.module').then( m => m.PaymentCreditModule)
  },
  {
    path: 'payment-success',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentModule)
  },
  {
    path: 'payment-init',
    loadChildren: () => import('./payment-init/payment-init.module').then( m => m.PaymentInitModule)
  },
  {
    path: 'pay',
    loadChildren: () => import('./pay-u/pay-u.module').then( m => m.PayUModule)
  },
  {
    path: 'payment-failure',
    loadChildren: () => import('./payment-failure/payment-failure.module').then( m => m.PaymentFailureModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
