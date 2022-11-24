import * as React from 'react';
import { Page } from './Page';
import { ToolbarProps } from '../components/Toolbar';

export default class Page404 extends Page<{}, {}> {
  public getInitialToolbarState(): ToolbarProps {
    return { actions: {}, breadcrumbs: [], pageTitle: '' };
  }

  public async refresh(): Promise<void> {
    return;
  }

  public render(): JSX.Element {
    return (
      <div style={{ margin: '100px auto', textAlign: 'center' }}>
        <div style={{ color: '#aaa', fontSize: 50, fontWeight: 'bold' }}>404</div>
        <div style={{ fontSize: 16 }}>Page Not Found: {this.props.location.pathname}</div>
      </div>
    );
  }
}