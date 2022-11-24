import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { stylesheet, classes } from 'typestyle';

const css = stylesheet({
  icon: {
    height: 20,
    marginRight: 4,
    width: 20,
  },
  root: {
    cursor: 'pointer',
    marginBottom: 2, // To prevent container from flickering as the spinner shows up
    position: 'relative',
    transition: 'padding 0.3s',
  },
  rootBusy: {
    cursor: 'default',
    paddingRight: 35,
  },
  spinner: {
    opacity: 0,
    position: 'absolute',
    right: '0.8em',
    transition: 'all 0.3s',
  },
  spinnerBusy: {
    opacity: 1,
  },
});

interface BusyButtonProps extends ButtonProps {
  title: string;
  icon?: any;
  busy?: boolean;
  outlined?: boolean;
}

class BusyButton extends React.Component<BusyButtonProps> {
  public render(): JSX.Element {
    const { title, busy, className, disabled, icon, outlined, ...rest } = this.props;

    return (
      <Button
        {...rest}
        color={outlined ? 'primary' : 'secondary'}
        className={classes(css.root, busy && css.rootBusy, className)}
        disabled={busy || disabled}
      >
        {!!icon && <this.props.icon className={css.icon} />}
        <span>{title}</span>
        {busy === true && (
          <CircularProgress size={15} className={classes(css.spinner, busy && css.spinnerBusy)} />
        )}
      </Button>
    );
  }
}

export default BusyButton;
