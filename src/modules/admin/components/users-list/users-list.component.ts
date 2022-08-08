import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

import { Command, User } from 'src/models/models';
import { ListBase } from 'src/modules/shared/base-classes/list.base';
import { WebRequestService } from 'src/modules/shared/services/web-request/web-request.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends ListBase<User> {
  entityName = 'users';

  constructor(
    webReq: WebRequestService,
    private router: Router,
    translateService: TranslateService
  ) {
    super(webReq, translateService);
  }

  public processCommand(command: Command) {
    if (command.commandName === 'edit') {
      if (!this.currentRow) {
        alert('messages.selectItem');
        return;
      }
      this.router.navigate(['admin/user', this.currentRow._id]);
    }
  }

  protected getColumns(): ColDef[] {
    const columns: ColDef[] = [
      { headerName: 'labels.username', field: 'username' },
      { headerName: 'labels.email', field: 'email' },
      {
        headerName: 'labels.role',
        field: 'role',
      },
    ];
    return columns;
  }

  protected getCommands(): Command[] {
    const commands: Command[] = [
      {
        commandName: 'edit',
        label: 'labels.edit',
      },
    ];
    return commands;
  }

  protected virtualChangeStructureOfDataAsync(
    data: User[]
  ): Observable<User[]> {
    return new Observable((subscriber) => {
      data.forEach((x, idx, array) => {
        this.translateService
          .get(('enums.' + x.role) as string)
          .subscribe((r) => {
            x.role = r;
            if (idx === array.length - 1) {
              subscriber.next(data);
              subscriber.complete();
            }
          });
      });
    });
  }
}
