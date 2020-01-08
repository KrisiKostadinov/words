import { trigger, state, style, transition, animate, animation } from "@angular/animations";

export const LevelUpAnimation = [
trigger('levelUpTriggerStatistics', [
    // ...
    state('closed', style({
      opacity: 0,
      transform: 'scale(0.7)'
    })),
    state('open', style({
      opacity: 1,
      transform: 'scale(1)'
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('1s')
    ]),
  ]),
  trigger('levelUpTrigger', [
    // ...
    state('closed', style({
      opacity: 0,
      transform: 'scale(0.7)'
    })),
    state('open', style({
      opacity: 1,
      transform: 'scale(1)'
    })),
    transition('open => closed', [
      animate('200ms')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ]),
  ])
]