import React from 'react';
import { css, cx } from 'emotion';
import tokens from '@contentful/f36-tokens';
import { Flex } from '@contentful/f36-core';
import { Asset, AssetIcon } from '@contentful/f36-components';
import type { AssetStatus, AssetType } from '@contentful/f36-components';

import { Card } from '../';
import type { CardInternalProps, CardProps } from '../';

export type AssetCardInternalProps = Omit<CardInternalProps, 'padding'> & {
  size?: 'small' | 'default';
  status: AssetStatus;
  type: AssetType;
};

export type AssetCardProps = AssetCardInternalProps;

const headerStyles = css({
  borderBottom: `1px solid #E7EBEE;`,
});

export const AssetCard = ({
  className,
  size = 'default',
  title,
  type,
  withDragHandle = true,
  ...otherProps
}: AssetCardInternalProps) => {
  return (
    <Card
      {...otherProps}
      className={cx(
        css({
          display: 'inline-flex',
          padding: 0,
          transition: `box-shadow ${tokens.transitionDurationShort} ${tokens.transitionEasingDefault},
          border-color ${tokens.transitionDurationDefault} ${tokens.transitionEasingDefault}`,
        }),
        className,
      )}
      headerStyles={headerStyles}
      iconButtonProps={{
        className: css({
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: tokens.borderRadiusMedium,
        }),
      }}
      withDragHandle={withDragHandle}
    >
      <Flex
        className={css({
          padding:
            size === 'small'
              ? tokens.spacingL
              : `calc(1rem * (56 / ${tokens.fontBaseDefault}))`,
        })}
      >
        <Asset status={status} title={title} type={type} />
      </Flex>
    </Card>
  );
};
