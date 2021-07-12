import { cx, css } from 'emotion';
import React, { forwardRef, useCallback, useState } from 'react';
import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import tokens from '@contentful/f36-tokens';
import {
  Flex,
  PolymorphicComponent,
  PolymorphicComponentWithRef,
} from '@contentful/f36-core';
import type { BoxProps } from '@contentful/f36-core';
import { Heading } from '@contentful/f36-typography';
import { Icon, IconComponent } from '@contentful/f36-icon';
import { MoreHorizontal } from '@contentful/f36-icons';
import { Button } from '@contentful/f36-button';
import type { ButtonProps } from '@contentful/f36-button';
import { Dropdown } from '@contentful/f36-components';

import { CardDragHandle } from '../';

const DEFAULT_TAG = 'article';

export type CardElement = 'a' | 'div' | 'article';

export type CardInternalProps = {
  /**
   * The DropdownList elements used to render an actions dropdown
   */
  actions?: React.ReactElement | React.ReactElement[];

  as?: CardElement;
  /**
   * If the card is selectable and has no title, it will need a aria-label to help screen readers identify it
   */
  ariaLabel?: string;
  /**
   * Class names to be appended to the className prop of the component
   */
  className?: string;
  /**
   * Child nodes to be rendered in the component
   */
  children?: ReactNode;
  headerStyles?: any;
  /**
   * Used to make the decision of either rendering the card as a link tag or as a div tag
   */
  href?: string;
  /**
   * Icon to show in the Card header
   */
  icon?: IconComponent;
  /**
   * Props to pass to the action menu button
   */
  iconButtonProps?: ButtonProps;
  /**
   * Applies active drag styles to the drag handle
   */
  isDragActive?: boolean;
  /**
   * Applies selected styles to the element
   */
  isSelected?: boolean;
  /**
   * Padding size to apply to the component
   */
  padding?: 'default' | 'large';
  /**
   * Used with href to define a relationship between a linked resource and the current document
   */
  rel?: string;
  /**
   * Badge
   */
  badge?: React.ReactElement;
  /**
   * Used with href to specify target attribute value
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  /**
   * An ID used for testing purposes applied as a data attribute (data-test-id)
   */
  testId?: string;
  /**
   * The title of the entry. It will also be used as aria-label
   */
  title?: string;
  /**
   * Render the component with a drag handle
   */
  withDragHandle?: boolean;
};

export type CardProps = CardInternalProps &
  Omit<BoxProps<'label'>, 'as' | 'display' | 'ref'>;

const styles = ({ isInteractive, isSelected, padding, withDragHandle }) => {
  const shared = {
    backgroundColor: tokens.colorWhite,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: tokens.colorElementMid,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorTextDark,
    fontSize: tokens.fontSizeM,
    fontWeight: tokens.fontWeightNormal,
    lineHeight: tokens.lineHeightM,
    padding: padding === 'large' ? tokens.spacingL : tokens.spacingM,
    textDecoration: 'none',
    transition: `border-color ${tokens.transitionDurationDefault} ${tokens.transitionEasingDefault}, box-shadow ${tokens.transitionDurationShort} ${tokens.transitionEasingDefault}`,
  };

  if (isSelected) {
    return css({
      ...shared,
      backgroundColor: tokens.colorBlueLightest,
      // boxShadow: `0px 0px 0px 1px inset ${tokens.colorBlueMid}`,
      borderColor: tokens.colorBlueMid,
      // '&:focus': {
      boxShadow: `${tokens.glowPrimary}, 0px 0px 0px 1px inset ${tokens.colorBlueMid}`,
      // },
    });
  }

  if (isInteractive || withDragHandle) {
    return css({
      ...shared,
      '&:hover, &:focus': {
        borderColor: tokens.colorPrimary,
        cursor: 'pointer',
        outline: 'none',
      },
      '&:focus': {
        boxShadow: tokens.glowPrimary,
      },
    });
  }

  return css(shared);
};

export const _Card: PolymorphicComponentWithRef<
  CardInternalProps,
  typeof DEFAULT_TAG
> = (
  {
    actions,
    ariaLabel,
    badge,
    children,
    className,
    headerStyles,
    href,
    icon,
    iconButtonProps,
    isDragActive = false,
    isSelected = false,
    onClick,
    padding = 'default',
    rel = 'noreferrer',
    target,
    testId = 'cf-ui-card',
    title,
    withDragHandle,
    ...otherProps
  },
  forwardedRef,
) => {
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
  const isInteractive = onClick || href;

  const classNames = cx(
    styles({ isInteractive, isSelected, padding, withDragHandle }),
    className,
  );

  const handleClick = onClick
    ? (event: MouseEvent<HTMLElement>) => onClick(event)
    : undefined;

  const handleKeyDown = onClick
    ? (event: KeyboardEvent<HTMLElement>) => {
        if (
          event.nativeEvent.code === 'Enter' ||
          event.nativeEvent.code === 'Space'
        ) {
          onClick(event);
          event.currentTarget.focus();
        }
      }
    : undefined;

  const handleActionClick = useCallback(
    (event) => {
      event.preventDefault();
      setIsActionsDropdownOpen(!isActionsDropdownOpen);
    },
    [isActionsDropdownOpen, setIsActionsDropdownOpen],
  );

  const hasHeaderItems = icon || actions;

  return (
    <Flex
      aria-label={title || ariaLabel}
      aria-pressed={onClick ? (isSelected ? 'true' : 'false') : undefined}
      as={DEFAULT_TAG}
      className={classNames}
      href={href}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      rel={href && rel}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      target={target}
      {...otherProps}
      ref={forwardedRef}
      testId={testId}
    >
      <CardDragHandle isDragActive={isDragActive} label="Reorder entry" />

      <div>
        {(title || hasHeaderItems) && (
          <Flex
            as="header"
            className={headerStyles}
            alignItems="center"
            marginBottom="spacingM"
          >
            {title && (
              <Flex flexGrow={1}>
                <Heading as="h2">{title}</Heading>
              </Flex>
            )}
            {hasHeaderItems && (
              <Flex
                alignItems="center"
                gap={`calc(1rem * (10 / ${tokens.fontBaseDefault}))`}
                className={css({
                  margin: `auto 0 auto auto`,
                })}
              >
                {icon && <Icon as={icon} />}
                {badge && badge}
                {actions && (
                  <Dropdown
                    isOpen={isActionsDropdownOpen}
                    onClose={() => {
                      setIsActionsDropdownOpen(false);
                    }}
                    placement="bottom-right"
                    toggleElement={
                      <Button
                        icon={MoreHorizontal}
                        {...iconButtonProps}
                        label="Actions"
                        onClick={handleActionClick}
                        variant="transparent"
                      />
                    }
                    usePortal={false}
                  >
                    {React.Children.map(
                      actions,
                      (listItems: React.ReactElement) => {
                        return React.Children.map(
                          listItems,
                          (item: React.ReactElement) => {
                            const resolvedChildren =
                              item.type === React.Fragment
                                ? item.props.children
                                : item;

                            const enhancedChildren = React.Children.map(
                              resolvedChildren,
                              (child: React.ReactElement) =>
                                React.cloneElement(child, {
                                  onClick: (event) => {
                                    if (child.props.onClick) {
                                      child.props.onClick(event);
                                    }
                                    setIsActionsDropdownOpen(false);
                                    event.stopPropagation();
                                  },
                                }),
                            );

                            return enhancedChildren;
                          },
                        );
                      },
                    )}
                  </Dropdown>
                )}
              </Flex>
            )}
          </Flex>
        )}

        {children}
      </div>
    </Flex>
  );
};

export const Card: PolymorphicComponent<
  CardInternalProps,
  typeof DEFAULT_TAG
> = forwardRef(_Card);
