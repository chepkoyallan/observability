import * as React from 'react';
import { RouterProps } from 'react-router';
import { GkeMetadataContext, GkeMetadata } from 'src/lib/GkeMetadata';
import { LocalStorage, LocalStorageKey } from 'src/lib/LocalStorage';
import { Apis } from '../lib/Apis';
import { logger } from '../lib/Utils';


interface DisplayBuildInfo {
    commitHash: string;
    commitUrl: string;
    date: string;
    tagName: string;
  }

interface SideNavState {
    displayBuildInfo?: DisplayBuildInfo;
    collapsed: boolean;
    jupyterHubAvailable: boolean;
    manualCollapseState: boolean;
  }
  


interface SideNavProps extends RouterProps{
    page: string
}

interface SideNavInternalProps extends SideNavProps {
    gkeMetadata: GkeMetadata;
}

export class SideNav extends React.Component<SideNavInternalProps, SideNavState>{
    private _isMounted = true;
    private readonly _AUTO_COLLAPSE_WIDTH = 800;
    private readonly _HUB_ADDRESS = '/hub/';
    constructor(props: any){
        super(props)
        const collapsed = LocalStorage.isNavbarCollapsed();
        this.state = {
            collapsed,
            jupyterHubAvailable: false,
            manualCollapseState: LocalStorage.hasKey(LocalStorageKey.navbarCollapsed),
        }
    }

    public async componentDidMount(): Promise<void> {
        window.addEventListener('resize', this._maybeResize.bind(this));
        this._maybeResize();

        async function fetchBuildInfo() {
            const buildInfo = await Apis.getBuildInfo();
            const commitHash = buildInfo.apiServerCommitHash || buildInfo.frontendCommitHash || '';
            const tagName = buildInfo.apiServerTagName || buildInfo.frontendTagName || '';
            return {
                tagName: tagName || 'unknown',
                commitHash: commitHash ? commitHash.substring(0, 7) : 'unknown',
                commitUrl:
                  'https://www.github.com/kubeflow/pipelines' +
                  (commitHash && commitHash !== 'unknown' ? `/commit/${commitHash}` : ''),
                date: buildInfo.buildDate
                  ? new Date(buildInfo.buildDate).toLocaleDateString('en-US')
                  : 'unknown',
            };
        }
        const displayBuildInfo = await fetchBuildInfo().catch(err => {
            logger.error('Failed to retrieve build info', err);
            return undefined;
        });
      
        this.setStateSafe({ displayBuildInfo });
    }

    public componentWillUnmount(): void {
        this._isMounted = false;
    }

    public render(): JSX.Element | null {
        return(
            <h1>Side Nav</h1>
        )
    }

    private _toggleNavCollapsed(shouldCollapse?: boolean): void {
        this.setStateSafe({
          collapsed: shouldCollapse !== undefined ? shouldCollapse : !this.state.collapsed,
        });
      }

    private _maybeResize(): void {
        if (!this.state.manualCollapseState) {
          this._toggleNavCollapsed(window.innerWidth < this._AUTO_COLLAPSE_WIDTH);
        }
      }
    
    private setStateSafe(newState: Partial<SideNavState>, cb?: () => void): void {
        if (this._isMounted) {
            this.setState(newState as any, cb);
        }
    }
}