import { animate, query, sequence, stagger, style, transition, trigger } from '@angular/animations';

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
          '0.2s cubic-bezier(0.55, 0, 0.55, 0.2)',
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
          '0.5s cubic-bezier(0.35, 0, 0.25, 1)',
          style({ transform: 'translateY(0%)', opacity: 1 })
        )
      ],
      { optional: true }
    )
  ]),
  query(':enter .' + ROUTE_ANIMATIONS_ELEMENTS, stagger(100, [
    style({ transform: 'translateY(15%)', opacity: 0 }),
    animate(
      '0.5s cubic-bezier(0.35, 0, 0.25, 1)',
      style({ transform: 'translateY(0%)', opacity: 1 })
    )
  ]), { optional: true })
];

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', STEPS_ALL),
]);
