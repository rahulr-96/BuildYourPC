import {
  animate,
  query,
  style,
  transition,
  trigger,
  stagger,
  sequence,
  animateChild,
  group
} from '@angular/animations';
import { AnimationsService } from './animations.service';

export const ROUTE_ANIMATIONS_ELEMENTS = 'route-animations-elements';

const STEPS_ALL: any[] = [
  query(':enter > *', style({ opacity: 0, position: 'fixed' }), {
    optional: true
  }),
  query(':enter .' + ROUTE_ANIMATIONS_ELEMENTS, style({ opacity: 0 }), {
    optional: true
  }),
  sequence([
    query(
      ':leave > *',
      [
        style({ transform: 'translateY(0%)', opacity: 1 }),
        animate(
          '0.2s ease-in-out',
          style({ transform: 'translateY(-3%)', opacity: 0 })
        ),
        style({ position: 'fixed' })
      ],
      { optional: true }
    ),
    query(
      ':enter > *',
      [
        style({
          transform: 'translateY(-3%)',
          opacity: 0,
          position: 'static'
        }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        )
      ],
      { optional: true }
    )
  ]),
  query(
    ':enter .' + ROUTE_ANIMATIONS_ELEMENTS,
    stagger(75, [
      style({ transform: 'translateY(10%)', opacity: 0 }),
      animate(
        '0.5s ease-in-out',
        style({ transform: 'translateY(0%)', opacity: 1 })
      )
    ]),
    { optional: true }
  )
];
const STEPS_NONE: any[] = [];
const STEPS_PAGE = [STEPS_ALL[0], STEPS_ALL[2]];
const STEPS_ELEMENTS = [STEPS_ALL[1], STEPS_ALL[3]];

// export const routeAnimations = trigger('routeAnimations', [
//   transition(isRouteAnimationsAll, STEPS_ALL),
//   transition(isRouteAnimationsNone, STEPS_NONE),
//   transition(isRouteAnimationsPage, STEPS_PAGE),
//    transition(isRouteAnimationsElements, STEPS_ELEMENTS)
// ]);
export const routeAnimations =  trigger('routeAnimations', [
  transition(':enter', [
    style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);
// export const routeTransitionAnimations = trigger('triggerName', [
// 	transition('One => Two, Two => Three, One => Three', [
// 		style({ position: 'relative' }),
// 		query(':enter, :leave', [
// 			style({
// 				position: 'absolute',
// 				top: 0,
// 				right: 0,
// 				width: '100%'
// 			})
// 		]),
// 		query(':enter', [style({ right: '-100%', opacity: 0 })]),
// 		query(':leave', animateChild()),
// 		group([
// 			query(':leave', [animate('1s ease-out', style({ right: '100%', opacity: 0 }))]),
// 			query(':enter', [animate('1s ease-out', style({ right: '0%', opacity: 1 }))])
// 		]),
// 		query(':enter', animateChild())
// 	]),
// 	transition('Three => Two, Two => One, Three => One', [
// 		style({ position: 'relative' }),
// 		query(':enter, :leave', [
// 			style({
// 				position: 'absolute',
// 				top: 0,
// 				left: 0,
// 				width: '100%'
// 			})
// 		]),
// 		query(':enter', [style({ left: '-100%', opacity: 0 })]),
// 		query(':leave', animateChild()),
// 		group([
// 			query(':leave', [animate('1s ease-out', style({ left: '100%', opacity: 0 }))]),
// 			query(':enter', [animate('1s ease-out', style({ left: '0%', opacity: 1 }))])
// 		]),
// 		query(':enter', animateChild())
// 	])
// ]);
export function isRouteAnimationsAll() {
  return AnimationsService.isRouteAnimationsType('ALL');
}

export function isRouteAnimationsNone() {
  return AnimationsService.isRouteAnimationsType('NONE');
}

export function isRouteAnimationsPage() {
  return AnimationsService.isRouteAnimationsType('PAGE');
}

export function isRouteAnimationsElements() {
  return AnimationsService.isRouteAnimationsType('ELEMENTS');
}
