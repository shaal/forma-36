import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react/types-6-0';
import { Flex } from '@contentful/f36-core';
import {
  Heading,
  SectionHeading,
  Paragraph,
  Typography,
} from '@contentful/f36-typography';
import { Clock } from '@contentful/f36-icons';
import { DropdownList, DropdownListItem } from '@contentful/f36-components';
import { Badge } from '@contentful/f36-badge';

import { AssetCard } from '../src';
import type { AssetCardProps } from '../src';

export default {
  argTypes: {
    as: { control: { disable: true } },
    className: { control: { disable: true } },
    rel: { control: { disable: true } },
    style: { control: { disable: true } },
    testId: { control: { disable: true } },
  },
  component: AssetCard,
  parameters: {
    propTypes: AssetCard['__docgenInfo'],
  },
  title: 'Components/Card/AssetCard',
} as Meta;

export const Default: Story<AssetCardProps> = (args) => {
  return <AssetCard {...args} />;
};

Default.args = {
  status: 'published',
  type: 'image',
  src: 'https://via.placeholder.com/200x300',
  title: 'Image of a cat',
};

export const Overview: Story<AssetCardProps> = (args) => {
  return (
    <>
      <Flex marginBottom="spacingS">
        <SectionHeading as="h3">Card with link and target</SectionHeading>
      </Flex>
      <AssetCard
        {...args}
        actions={
          <DropdownList>
            <DropdownListItem>Copy</DropdownListItem>
            <DropdownListItem>Delete</DropdownListItem>
          </DropdownList>
        }
      />

      <Flex marginBottom="spacingS" marginTop="spacingM">
        <SectionHeading as="h3">AssetCard selected</SectionHeading>
      </Flex>
      <AssetCard
        actions={
          <DropdownList>
            <DropdownListItem>Copy</DropdownListItem>
            <DropdownListItem>Delete</DropdownListItem>
          </DropdownList>
        }
        isSelected
      />
    </>
  );
};
