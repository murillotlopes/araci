import { Component, ContentChildren, QueryList } from '@angular/core';
import { TabPane } from './tab-pane/tab-pane';

@Component({
  selector: 'app-tabs-nav',
  imports: [],
  templateUrl: './tabs-nav.html',
  styleUrl: './tabs-nav.scss',
})
export class TabsNav {
  @ContentChildren(TabPane) panes!: QueryList<TabPane>

  activeTabId: string = ''

  ngAfterContentInit() {

    const firstTab = this.panes.first;
    if (firstTab) {
      this.selectTab(firstTab.activeId);
    }
  }

  selectTab(tabId: string) {
    this.activeTabId = tabId;

    this.panes.forEach(pane => {
      pane.visible = (pane.activeId === tabId);
    });
  }
}
