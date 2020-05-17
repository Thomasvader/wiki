import { trigger, transition, style, query, animateChild, group, animate } from "@angular/animations";

export const routeAnimation: any = trigger('routeAnimation', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate('300ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({
      opacity: 0
    }),
    animate('300ms', style({ opacity: 0 }))
  ])
])
