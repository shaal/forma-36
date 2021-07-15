import React, { Component } from 'react';
import { css } from '@emotion/core';
import tokens from '@contentful/forma-36-tokens';
import { Flex } from '@contentful/forma-36-react-components';

const styles = {
  container: css({
    display: 'inline-block',
    boxSizing: 'border-box',
    margin: tokens.spacingXs,
    width: `calc(15% - ${tokens.spacingS})`,
    borderRadius: `4px`,
    boxShadow: `0 1px 2px rgba(0, 0, 0, 0.25)`,
    position: 'relative',
  }),
  swatch: css({
    height: '100px',
    borderRadius: `${tokens.spacing2Xs} ${tokens.spacing2Xs} 0 0`,
  }),
  name: css({
    fontWeight: 'bold',
    color: tokens.gray700,
    fontSize: tokens.fontSizeS
  }),
};

class ColorBox extends Component {
  state = {
    value: '',
    copiedHex: false,
    copiedCssVar: false,
  };

  render() {
    const { name, hex, textColor, size, ...otherProps } = this.props;
    console.log(size);
    return (
      <div css={styles.container} {...otherProps} style={{ width: `calc(${size}% - ${tokens.spacingS})`}}>
        <Flex justifyContent="center" alignItems="center" css={styles.swatch} style={{ backgroundColor: hex }}>
          <span css={styles.name} style={{ color: textColor}}>{name}</span>
        </Flex>
      </div>
    );
  }
}

export default ColorBox;
