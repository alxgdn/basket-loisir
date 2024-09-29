import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../shared/services/session.service';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { Session } from '../../../shared/models/session.model';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import moment from 'moment';
import { DateUtils } from '../../../shared/helpers/date.utils';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatTableModule,
    MatIcon,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './sessions.component.html',
})
@UntilDestroy()
export class SessionsComponent implements OnInit {
  displayedColumns = ['date', 'nbJoueurs', 'actions'];
  dataSource: MatTableDataSource<Session>;
  hasSessionForToday: boolean;

  constructor(private sessionService: SessionService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    const today = moment(new Date()).format(DateUtils.frenchDateFormat);
    this.sessionService.getSessions().pipe(untilDestroyed(this)).subscribe((sessions) => {
      sessions.forEach((session) => {
        session.isToday = (session.date === today);
      });
      this.dataSource.data = sessions;
      this.hasSessionForToday = sessions.filter((s) => s.isToday).length > 0;
    });
  }

  newSession() {
    this.router.navigateByUrl('/session/create/');
  }

  continue(session: Session) {
    this.router.navigateByUrl(`/session/create/${session.uuid}`).then();
  }
}
