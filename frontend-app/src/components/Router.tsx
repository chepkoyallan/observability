import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import { DialogActions, SnackbarProps, Button, DialogContent, DialogTitle, Dialog} from '@mui/material';
import Banner, { BannerProps } from './Banner';
import { classes, stylesheet } from 'typestyle';
import { commonCss } from '../Css';
import Toolbar, { ToolbarProps } from './Toolbar';
import Page404 from 'src/pages/404';
import Snackbar from '@mui/material/Snackbar';
import { SideNav } from './Sidenav';
// import Dialog from '@mui/material';
// SideNav

const css = stylesheet({
  dialog: {
    minWidth: 250,
  },
});

export interface DialogProps {
  buttons?: Array<{ onClick?: () => any; text: string }>;
  // TODO: This should be generalized to any react component.
  content?: string;
  onClose?: () => any;
  open?: boolean;
  title?: string;
}


interface RouteComponentState{
    bannerProps: BannerProps;
    dialogProps: DialogProps;
    snackbarProps: SnackbarProps;
    toolbarProps: ToolbarProps
}

export type RouteConfig = {
    path: string;
    Component: React.ComponentType<any>;
    view?: any;
    notExact?: boolean
}

export interface RouterProps {
    configs?: RouteConfig[];
}

export const RoutePage = {
    START: '/start'
}

const Router: React.FC<RouterProps> = ({configs}) => {
    const DEFAULT_ROUTE = RoutePage.START
    const routes: RouteConfig[] = configs || [
        {
            path: RoutePage.START,
            Component: App,
        }
    ];
    return(
      <SideNavLayout>
        <Switch>
            <Route
                exact={true}
                path={'/'}
                render={({ ...props }) => <Redirect to={DEFAULT_ROUTE} {...props} />}
            />
            {/* Normal Routes */}
            {routes.map((route, i) => {
                const {path} = {...route};
                return (
                     // Setting a key here, so that two different routes are considered two instances from
                    // react. Therefore, they don't share toolbar state. This avoids many bugs like dangling
                    // network response handlers.
                    <Route
                        key={i}
                        exact={!route.notExact}
                        path={path}
                        render={props => <RoutedPage key={props.location.key} route={route}/>}
                    />
                );
            })}
            {/* 404 */}
            {
                <Route>
                    <RoutedPage/>
                </Route>
            }
        </Switch>
      </SideNavLayout>
    );
};

class RoutedPage extends React.Component<{ route?: RouteConfig }, RouteComponentState> {
    private childProps = {
      toolbarProps: {
        breadcrumbs: [{ displayName: '', href: '' }],
        actions: {},
        pageTitle: '',
      } as ToolbarProps,
      updateBanner: this._updateBanner.bind(this),
      updateDialog: this._updateDialog.bind(this),
      updateSnackbar: this._updateSnackbar.bind(this),
      updateToolbar: this._updateToolbar.bind(this),
    };
  
    constructor(props: any) {
      super(props);
  
      this.state = {
        bannerProps: {},
        dialogProps: { open: false },
        snackbarProps: { autoHideDuration: 5000, open: false },
        toolbarProps: { breadcrumbs: [{ displayName: '', href: '' }], actions: [], ...props },
      };
    }
  
    public render(): JSX.Element {
      this.childProps.toolbarProps = this.state.toolbarProps;
      const route = this.props.route;
  
      return (
        <div className={classes(commonCss.page)}>
          {/* <Route render={({ ...props }) => <Toolbar {...this.state.toolbarProps} {...props} />} /> */}
          {this.state.bannerProps.message && (
            <Banner
              message={this.state.bannerProps.message}
              mode={this.state.bannerProps.mode}
              additionalInfo={this.state.bannerProps.additionalInfo}
              refresh={this.state.bannerProps.refresh}
              showTroubleshootingGuideLink={true}
            />
          )}
          <Switch>
            {route &&
              (() => {
                const { path, Component, ...otherProps } = { ...route };
                return (
                  <Route
                    exact={!route.notExact}
                    path={path}
                    render={({ ...props }) => (
                      <Component {...props} {...this.childProps} {...otherProps} />
                    )}
                  />
                );
              })()}
  
            {/* 404 */}
            {!!route && (
              <Route render={({ ...props }) => <Page404 {...props} {...this.childProps} />} />
            )}
          </Switch>
  
          <Snackbar
            autoHideDuration={this.state.snackbarProps.autoHideDuration}
            message={this.state.snackbarProps.message}
            open={this.state.snackbarProps.open}
            onClose={this._handleSnackbarClose.bind(this)}
          />
  
          <Dialog
            open={this.state.dialogProps.open !== false}
            classes={{ paper: css.dialog }}
            className='dialog'
            onClose={() => this._handleDialogClosed()}
          >
            {this.state.dialogProps.title && (
              <DialogTitle> {this.state.dialogProps.title}</DialogTitle>
            )}
            {this.state.dialogProps.content && (
              <DialogContent className={commonCss.prewrap}>
                {this.state.dialogProps.content}
              </DialogContent>
            )}
            {this.state.dialogProps.buttons && (
              <DialogActions>
                {this.state.dialogProps.buttons.map((b, i) => (
                  <Button
                    key={i}
                    onClick={() => this._handleDialogClosed(b.onClick)}
                    className='dialogButton'
                    color='secondary'
                  >
                    {b.text}
                  </Button>
                ))}
              </DialogActions>
            )}
          </Dialog>
        </div>
      );
    }
  
    private _updateDialog(dialogProps: DialogProps): void {
      // Assuming components will want to open the dialog by defaut.
      if (dialogProps.open === undefined) {
        dialogProps.open = true;
      }
      this.setState({ dialogProps });
    }
  
    private _updateToolbar(newToolbarProps: Partial<ToolbarProps>): void {
      const toolbarProps = Object.assign(this.state.toolbarProps, newToolbarProps);
      this.setState({ toolbarProps });
    }
  
    private _updateBanner(bannerProps: BannerProps): void {
      this.setState({ bannerProps });
    }
  
    private _updateSnackbar(snackbarProps: SnackbarProps): void {
      snackbarProps.autoHideDuration =
        snackbarProps.autoHideDuration || this.state.snackbarProps.autoHideDuration;
      this.setState({ snackbarProps });
    }
  
    private _handleDialogClosed(onClick?: () => void): void {
      this.setState({ dialogProps: { open: false } });
      if (onClick) {
        onClick();
      }
      if (this.state.dialogProps.onClose) {
        this.state.dialogProps.onClose();
      }
    }
    private _handleSnackbarClose(): void {
      this.setState({ snackbarProps: { open: false, message: '' } });
    }
}

export default Router;

const SideNavLayout: React.FC<{}> = ({ children }) => (
  <div className={classes(commonCss.page)}>
    <div className={classes(commonCss.flexGrow)}>
      <Route render={({ ...props }) => <SideNav page={props.location.pathname} {...props} />} />
      {children}
    </div>
  </div>
);