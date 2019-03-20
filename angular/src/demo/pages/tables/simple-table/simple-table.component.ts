import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fury-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent implements OnInit {

  rows: any[];

  tableHover = true;
  tableStriped = true;
  tableCondensed = false;
  tableBordered = false;

  constructor() { }

  ngOnInit() {
    this.rows = [
      {
        'name': {
          'first': 'Debora',
          'last': 'Castro'
        },
        'picture': 'assets/img/avatars/15.jpg',
        'company': 'SIGNIDYNE',
        'email': 'debora.castro@signidyne.ca',
        'phone': '+1 (979) 427-3700',
        'balance': '$1,743.04'
      },
      {
        'name': {
          'first': 'Warren',
          'last': 'Gallegos'
        },
        'picture': 'assets/img/avatars/8.jpg',
        'company': 'XSPORTS',
        'email': 'warren.gallegos@xsports.biz',
        'phone': '+1 (964) 433-3008',
        'balance': '$1,122.90'
      },
      {
        'name': {
          'first': 'Gordon',
          'last': 'Sloan'
        },
        'picture': 'assets/img/avatars/17.jpg',
        'company': 'FUTURIS',
        'email': 'gordon.sloan@futuris.com',
        'phone': '+1 (904) 572-2860',
        'balance': '$1,505.24'
      },
      {
        'name': {
          'first': 'Nettie',
          'last': 'Hoover'
        },
        'picture': 'assets/img/avatars/5.jpg',
        'company': 'UNEEQ',
        'email': 'nettie.hoover@uneeq.us',
        'phone': '+1 (943) 579-2855',
        'balance': '$2,206.32'
      },
      {
        'name': {
          'first': 'Bartlett',
          'last': 'Kramer'
        },
        'picture': 'assets/img/avatars/13.jpg',
        'company': 'MIXERS',
        'email': 'bartlett.kramer@mixers.co.uk',
        'phone': '+1 (897) 410-2327',
        'balance': '$1,220.73'
      },
      {
        'name': {
          'first': 'Martina',
          'last': 'Barnes'
        },
        'picture': 'assets/img/avatars/17.jpg',
        'company': 'VERAQ',
        'email': 'martina.barnes@veraq.biz',
        'phone': '+1 (917) 535-3821',
        'balance': '$1,236.69'
      },
      {
        'name': {
          'first': 'Vasquez',
          'last': 'Pugh'
        },
        'picture': 'assets/img/avatars/8.jpg',
        'company': 'MOMENTIA',
        'email': 'vasquez.pugh@momentia.net',
        'phone': '+1 (903) 505-2458',
        'balance': '$1,734.39'
      },
      {
        'name': {
          'first': 'Moran',
          'last': 'Burris'
        },
        'picture': 'assets/img/avatars/9.jpg',
        'company': 'ZOLAVO',
        'email': 'moran.burris@zolavo.org',
        'phone': '+1 (985) 531-3293',
        'balance': '$2,320.01'
      },
      {
        'name': {
          'first': 'Kayla',
          'last': 'Langley'
        },
        'picture': 'assets/img/avatars/6.jpg',
        'company': 'ELECTONIC',
        'email': 'kayla.langley@electonic.tv',
        'phone': '+1 (901) 473-2752',
        'balance': '$2,600.99'
      },
      {
        'name': {
          'first': 'Hutchinson',
          'last': 'Golden'
        },
        'picture': 'assets/img/avatars/4.jpg',
        'company': 'CEDWARD',
        'email': 'hutchinson.golden@cedward.name',
        'phone': '+1 (906) 540-2818',
        'balance': '$3,077.00'
      },
      {
        'name': {
          'first': 'Cherry',
          'last': 'Pollard'
        },
        'picture': 'assets/img/avatars/6.jpg',
        'company': 'ZOXY',
        'email': 'cherry.pollard@zoxy.io',
        'phone': '+1 (962) 591-3338',
        'balance': '$2,528.52'
      },
      {
        'name': {
          'first': 'Samantha',
          'last': 'Flowers'
        },
        'picture': 'assets/img/avatars/4.jpg',
        'company': 'COMTOUR',
        'email': 'samantha.flowers@comtour.me',
        'phone': '+1 (948) 513-3422',
        'balance': '$3,517.51'
      }
    ];

  }

}
