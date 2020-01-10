import { trigger, state, style, transition, animate, animation } from "@angular/animations";

export const AnimationWord = [
trigger('isOpen', [
    // ...
    state('closed', style({
      opacity: 0,
      transform: 'scale(2)'
    })),
    state('open', style({
      opacity: 1,
      transform: 'scale(1)'
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ]),
  ]),
  trigger('isOpenBonus', [
    // ...
    state('closed', style({
      opacity: 0,
      transform: 'scale(2)'
    })),
    state('open', style({
      opacity: 1,
      transform: 'scale(1)'
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ]),
  ])
]