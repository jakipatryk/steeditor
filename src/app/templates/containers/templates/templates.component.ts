import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../../store/root-state';
import {
  selectAllTemplates,
  selectTemplatesLoaded,
  selectTemplatesLoading,
  selectTemplatesTotal,
  Template,
  templatesActionCreators
} from '../../../store/templates-store';
import { routerActionCreators } from './../../../store/router-store';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatesComponent implements OnInit {
  templates$: Observable<Template[]>;
  templatesTotal$: Observable<number>;
  areLoading$: Observable<boolean>;
  areLoaded$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.templates$ = this.store.select(selectAllTemplates);
    this.templatesTotal$ = this.store.select(selectTemplatesTotal);
    this.areLoading$ = this.store.select(selectTemplatesLoading);
    this.areLoaded$ = this.store.select(selectTemplatesLoaded);
    this.store.dispatch(templatesActionCreators.loadTemplates());
  }

  editTemplate(id: number) {
    this.store.dispatch(routerActionCreators.go({ path: ['/templates', id] }));
  }

  removeTemplate(id: number) {
    this.store.dispatch(templatesActionCreators.removeTemplate(id));
  }

  createTemplate() {
    this.store.dispatch(templatesActionCreators.createTemplate());
  }
}
