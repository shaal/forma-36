import { css } from 'emotion';
import React, { forwardRef } from 'react';
import { Primitive } from '@contentful/f36-core';
import type { CommonProps } from '@contentful/f36-core';
import { Drag } from '@contentful/f36-icons';
import tokens from '@contentful/f36-tokens';

export type CardDragHandleInternalProps = {
  /**
   * Applies styling for when the component is actively being dragged by the user
   */
  isDragActive?: boolean;
  /**
   * Label rendered in CardDragHandle - not visible on screen as
   * purpose is for screen readers only
   */
  label: React.ReactNode;
};

export type CardDragHandleProps = CommonProps & CardDragHandleInternalProps;

export const CardDragHandle = forwardRef<HTMLDivElement, CardDragHandleProps>(
  function CardDragHandle(
    { isDragActive, label, testId = 'cf-ui-card-drag-handle', ...otherProps },
    forwardedRef,
  ) {
    return (
      <Primitive
        as="div"
        className={css({
          alignItems: 'center',
          backgroundColor: isDragActive
            ? tokens.colorElementLight
            : tokens.colorElementLightest,
          border: 0,
          borderBottomLeftRadius: tokens.borderRadiusMedium,
          borderRight: `1px solid ${tokens.colorElementMid}`,
          borderTopLeftRadius: tokens.borderRadiusMedium,
          boxSizing: 'border-box',
          cursor: isDragActive ? 'grabbing' : 'grab',
          display: 'flex',
          justifyContent: 'center',
          padding: 0,
          position: 'relative',
          transition: `background-color ${tokens.transitionDurationDefault} ${tokens.transitionEasingDefault}`,
          width: tokens.spacingL,

          '&:hover, &:focus': {
            backgroundColor: tokens.colorElementLight,
          },
        })}
        {...otherProps}
        testId={testId}
        ref={forwardedRef}
      >
        <Drag variant="muted" />
        <span
          className={css({
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            border: 0,
          })}
        >
          {label}
        </span>
      </Primitive>
    );
  },
);
