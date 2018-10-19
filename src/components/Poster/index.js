// @flow
import React from 'react';
import type { Node } from 'react';
import injectSheet from 'react-jss';
import { SMALL_DEVICE } from '../../MediaQueries';


type Props = {
  classes: { [classNames: string]: string },
  imageUrl: string,
  title: string,
  subtitle: string,
  additionalInfo?: ?Node,
  overlay?: ?Node,
};

const Poster = ({ classes, imageUrl, title, subtitle, additionalInfo, overlay }: Props) => (
  <div className={classes.poster}>
    <div className={classes.posterImage} style={{ backgroundImage: `url(${imageUrl})` }}>
      {overlay && (
        <div className={classes.overlayContainer}>{overlay}</div>
      )}
    </div>
    <div className={classes.posterCaption}>
      <div className={classes.title} title={title}>
        {title}
      </div>
      <div className={classes.subtitle} title={subtitle}>
        {subtitle}
      </div>
      {additionalInfo && (
        <div>{additionalInfo}</div>
      )}
      <div className={classes.fadeOutGradient} />
    </div>
  </div>
);

const styles = {
  poster: {
    display: 'inline-block',
    width: '175px',
    borderRadius: '4px',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',

    [SMALL_DEVICE]: {
      width: '135px',
    },

    '&:hover $overlayContainer': {
      visibility: 'visible',
      opacity: 1,
      transition: 'opacity 200ms ease-in-out, visibility 200ms linear',
    },

  },
  posterImage: {
    position: 'relative',
    width: '175px',
    height: '255px',
    backgroundSize: 'cover',

    [SMALL_DEVICE]: {
      width: '135px',
      height: '195px',
    },
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
    visibility: 'hidden',
  },
  posterCaption: {
    position: 'relative',
    padding: '8px',
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'sans-serif',
    fontSize: '16px',
    color: 'black',
    whiteSpace: 'nowrap',

    [SMALL_DEVICE]: {
      fontSize: '13px',
    }
  },
  subtitle: {
    fontFamily: 'sans-serif',
    fontSize: '13px',
    color: 'gray',
    whiteSpace: 'nowrap',

    [SMALL_DEVICE]: {
      fontSize: '12px',
    }
  },
  fadeOutGradient: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '44px',
    width: '50px',
    background: 'linear-gradient(to left, white 8px, transparent);',
  },
};


export default injectSheet(styles)(Poster);
