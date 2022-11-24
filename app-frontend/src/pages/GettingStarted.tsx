import * as React from 'react';
import { Page } from "./Page";
import { classes, cssRaw } from 'typestyle';
import { commonCss, padding } from "src/Css";

export class GettingStarted extends Page<{}, {links: string[]}> {
    /**
     * render
     */
    public render(): JSX.Element {
        return (
            <div className={classes(commonCss.page, padding(20, 'lr'), 'kfp-start-page')}>
                <h1>Start</h1>
            </div>
        )
    }
}