import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      :host ::ng-deep .ui-slidemenu {
          width: 13.5em
      }
  `,
  ],
})
export class AppComponent {
  items: MenuItem[];
  isEmail: boolean = false;
  radioVal = { value: '' };

  recentNodeClicked: any;
  flowTree = [{}];

  topEmployee: any = {
    id: 1,
    name: '+',
    imageUrl:
      'https://images.pexels.com/photos/13973602/pexels-photo-13973602.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    subordinates: [
      // {
      //   // name: 'East Coast Group',
      //   // subordinates: [
      //   //   {
      //   //     name: 'Eastern Foreign',
      //   //   },
      //   //   {
      //   //     name: 'Eastern Domestic',
      //   //     subordinates: [{ name: 'Cleveland Chevy' }],
      //   //   },
      //   // ],
      // },
      // {
      //   name: 'West Coast Group',
      //   subordinates: [
      //     {
      //       name: 'Western Foreign',
      //     },
      //   ],
      // },
    ],
  };
  isClicked(topEmployee: any) {
    console.log(topEmployee);
    this.recentNodeClicked = topEmployee;
    // this.openDialog();
  }
  sendEmail(email: string, message: string) {
    let previousNode = this.recentNodeClicked;
    console.log('I am active.');
    console.log('Email: ' + email + ' Message: ' + message);
    //append and sync the clicked node with the data from modal
    let recentData = {
      id: previousNode.id,
      email: email,
      message: message,
    };
    this.flowTree.push(recentData);
    console.log(recentData);

    //track the previous id and add subordinate to it.
    previousNode.subordinates = [
      ...previousNode.subordinates,
      {
        id: 2,
        name: 'email',
        subordinates: [],
      },
    ];
    // this.topEmployee.subordinates = [...this.topEmployee.subordinates,previousNode.subordinates];
    // this.topEmployee.subordinates = previousNode.subordinates;
  }
  whichRadioClicked(value: string) {
    if (value == 'email') {
      //email
      this.isEmail = true;
      this.recentNodeClicked.subordinates.push({
        id: this.recentNodeClicked.id + 1,
        name: value,
        subordinates: [],
      });
    } else {
      //sms
      this.isEmail = false;
    }
  }
  endCalled(endEvent: any): void {
    console.log('end');
    console.log(endEvent);
    let endNode = {
      id: this.recentNodeClicked.id + 1,
      name: 'End Node',
      imageUrl:
        'https://media.istockphoto.com/id/1302642699/vector/abstract-red-vector-background-with-stripes-can-be-used-for-cover-design-poster-and.jpg?s=612x612&w=0&k=20&c=3cQPZx57nAV0f1evtuRk9p2EgmAVGb_A063Htb2_Gtw=',
      subordinates: [],
    };
    this.recentNodeClicked.subordinates.push(endNode);
    //  document.getElementById("myModal").setAttribute("data-bs-dismiss","modal")
  }
  tabCalled(hello) {
    console.log();
  }
  sendTwoMail(twoMailEvent: any) {
    let node1 = {
      id: this.recentNodeClicked + 1,
      name: 'Group One',
      imageUrl:
        'https://icons.iconarchive.com/icons/graphicloads/100-flat-2/32/email-icon.png',
    };
    let node2 = {
      id: node1.id + 1,
      name: 'Group Two',
      imageUrl:
        'https://icons.iconarchive.com/icons/graphicloads/100-flat-2/32/email-icon.png',
    };
    this.recentNodeClicked.subordinates.push(node1);
    this.recentNodeClicked.subordinates.push(node2);
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Action',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Send Mail to Two Groups',
            icon: 'pi pi-fw pi-plus',
            command: (event) => {
              //event.originalEvent: Browser event
              //event.item: menuitem metadata
              this.sendTwoMail(event);
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
          },
          {
            separator: true,
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link',
          },
        ],
      },
      {
        label: 'Trigger',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
      },
      {
        label: 'Rule',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print',
                  },
                ],
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
              },
            ],
          },
        ],
      },

      {
        label: 'End',
        icon: 'pi pi-fw pi-power-off',
        command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
          this.endCalled(event);
        },
      },
    ];
  }
}
