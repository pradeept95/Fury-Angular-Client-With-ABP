import * as moment from 'moment';

const messages = [
  {
    message: 'Hey David! How\'s it going?',
    when: moment().subtract(35, 'minutes'),
    who: 'partner'
  },
  {
    message: 'You wanted to go golfing you remember? What about this weekend?',
    when: moment().subtract(34, 'minutes'),
    who: 'partner'
  },
  {
    message: 'Hey! I\'m good. Sure, let\'s meet on Saturday at the golf club, okay?',
    when: moment().subtract(28, 'minutes'),
    who: 'me'
  },
  {
    message: 'Sure thing! I hope we can finally beat our record this time. :)',
    when: moment().subtract(26, 'minutes'),
    who: 'partner'
  },
  {
    message: 'Awesome! We surely will. ;)',
    when: moment().subtract(22, 'minutes'),
    who: 'me'
  },
  {
    message: 'See you on Saturday!',
    when: moment().subtract(21, 'minutes'),
    who: 'me'
  }
];

export let chatDemoData = [
  {
    'picture': 'assets/img/avatars/13.jpg',
    'name': 'Lawrence Larson',
    'messages': messages,
    'lastMessageTime': moment().subtract(170, 'minutes'),
    'lastMessage': 'commodo deserunt enim'
  },
  {
    'picture': 'assets/img/avatars/10.jpg',
    'name': 'Therese Alvarez',
    'messages': messages,
    'lastMessageTime': moment().subtract(371, 'minutes'),
    'lastMessage': 'sunt duis dolor'
  },
  {
    'picture': 'assets/img/avatars/3.jpg',
    'name': 'Roseann Dejesus',
    'messages': messages,
    'lastMessageTime': moment().subtract(410, 'minutes'),
    'lastMessage': 'et duis ex'
  },
  {
    'picture': 'assets/img/avatars/15.jpg',
    'name': 'Lorena Aguirre',
    'messages': messages,
    'lastMessageTime': moment().subtract(239, 'minutes'),
    'lastMessage': 'consectetur dolor ea'
  },
  {
    'picture': 'assets/img/avatars/18.jpg',
    'name': 'Ayala Martinez',
    'messages': messages,
    'lastMessageTime': moment().subtract(534, 'minutes'),
    'lastMessage': 'velit reprehenderit in'
  },
  {
    'picture': 'assets/img/avatars/10.jpg',
    'name': 'Helene Curtis',
    'messages': messages,
    'lastMessageTime': moment().subtract(215, 'minutes'),
    'lastMessage': 'enim aute dolore'
  },
  {
    'picture': 'assets/img/avatars/20.jpg',
    'name': 'Donovan Vega',
    'messages': messages,
    'lastMessageTime': moment().subtract(539, 'minutes'),
    'lastMessage': 'eiusmod aute et'
  },
  {
    'picture': 'assets/img/avatars/4.jpg',
    'name': 'Frieda Robbins',
    'messages': messages,
    'lastMessageTime': moment().subtract(187, 'minutes'),
    'lastMessage': 'officia excepteur elit'
  },
  {
    'picture': 'assets/img/avatars/20.jpg',
    'name': 'Dolores Rojas',
    'messages': messages,
    'lastMessageTime': moment().subtract(30, 'minutes'),
    'lastMessage': 'ad duis ex'
  },
  {
    'picture': 'assets/img/avatars/16.jpg',
    'name': 'Lila Wade',
    'messages': messages,
    'lastMessageTime': moment().subtract(158, 'minutes'),
    'lastMessage': 'in nostrud anim'
  },
  {
    'picture': 'assets/img/avatars/19.jpg',
    'name': 'Toni Knapp',
    'messages': messages,
    'lastMessageTime': moment().subtract(288, 'minutes'),
    'lastMessage': 'consectetur id tempor'
  }
];
