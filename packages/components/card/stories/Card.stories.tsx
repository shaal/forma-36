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

import { Card } from '../src';
import type { CardProps } from '../src';

export default {
  argTypes: {
    as: { control: { disable: true } },
    className: { control: { disable: true } },
    rel: { control: { disable: true } },
    style: { control: { disable: true } },
    testId: { control: { disable: true } },
  },
  component: Card,
  parameters: {
    propTypes: Card['__docgenInfo'],
  },
  title: 'Components/Card',
} as Meta;

export const Default: Story<CardProps> = (args) => {
  return <Card {...args} />;
};

Default.args = {
  children: 'This is the Card’s content',
};

export const WithOnClick = (args: CardProps) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Card {...args} onClick={() => setShow(!show)}>
        Click on this card
        <br />
        {show && (
          <span role="img" aria-label="sparkles">
            ✨✨✨
          </span>
        )}
      </Card>
    </div>
  );
};

export const SelectableCards: Story<CardProps> = () => {
  const [taco, setTaco] = useState(false);
  const [pizza, setPizza] = useState(false);
  const [broccoli, setBroccoli] = useState(false);
  return (
    <div style={{ maxWidth: '280px' }}>
      <Heading>What is your favorite food?</Heading>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1rem',
        }}
      >
        <Card onClick={() => setTaco(!taco)} isSelected={taco}>
          <span style={{ fontSize: '3rem' }} role="img" aria-label="taco">
            🌮
          </span>
        </Card>
        <Card onClick={() => setPizza(!pizza)} isSelected={pizza}>
          <span style={{ fontSize: '3rem' }} role="img" aria-label="pizza">
            🍕
          </span>
        </Card>
        <Card onClick={() => setBroccoli(!broccoli)} isSelected={broccoli}>
          <span style={{ fontSize: '3rem' }} role="img" aria-label="broccoli">
            🥦
          </span>
        </Card>
      </div>
    </div>
  );
};

export const WithLinkAndTarget: Story<CardProps> = (args) => {
  return (
    <Card {...args}>
      <Typography>
        <Heading>Forma36</Heading>
        <Paragraph>
          Forma 36 is an open-source design system by Contentful created with
          the intent to reduce the overhead of creating UI by providing tools
          and guidance for digital teams building and extending Contentful
          products.
        </Paragraph>
      </Typography>
    </Card>
  );
};

WithLinkAndTarget.args = {
  href: 'https://f36.contentful.com/',
  target: '_blank',
};

export const Overview: Story<CardProps> = (args) => {
  return (
    <>
      <Flex marginBottom="spacingS">
        <SectionHeading as="h3">Card with link and target</SectionHeading>
      </Flex>
      <Card {...args}>
        <Typography>
          <Heading>Forma 36</Heading>
          <Paragraph>
            Forma 36 is an open-source design system by Contentful created with
            the intent to reduce the overhead of creating UI by providing tools
            and guidance for digital teams building and extending Contentful
            products.
          </Paragraph>
        </Typography>
      </Card>

      <Flex marginBottom="spacingS" marginTop="spacingM">
        <SectionHeading as="h3">Card selected</SectionHeading>
      </Flex>
      <Card isSelected>
        <Heading>Forma 36</Heading>
        <Paragraph>
          Forma 36 is an open-source design system by Contentful created with
          the intent to reduce the overhead of creating UI by providing tools
          and guidance for digital teams building and extending Contentful
          products.
        </Paragraph>
      </Card>

      <Flex marginBottom="spacingS" marginTop="spacingM">
        <SectionHeading as="h3">Card with default padding</SectionHeading>
      </Flex>
      <Card padding="default">
        <Typography>
          <Heading>Forma 36</Heading>
          <Paragraph>
            Forma 36 is an open-source design system by Contentful created with
            the intent to reduce the overhead of creating UI by providing tools
            and guidance for digital teams building and extending Contentful
            products.
          </Paragraph>
        </Typography>
      </Card>
      <Flex marginBottom="spacingS" marginTop="spacingM">
        <SectionHeading as="h3">Card with large padding</SectionHeading>
      </Flex>
      <Card padding="large">
        <Typography>
          <Heading>Forma 36</Heading>
          <Paragraph>
            Forma 36 is an open-source design system by Contentful created with
            the intent to reduce the overhead of creating UI by providing tools
            and guidance for digital teams building and extending Contentful
            products.
          </Paragraph>
        </Typography>
      </Card>

      <Flex marginBottom="spacingS" marginTop="spacingM">
        <SectionHeading as="h3">Card with header items</SectionHeading>
      </Flex>
      <Card
        actions={
          <DropdownList>
            <DropdownListItem onClick={() => {}}>Edit</DropdownListItem>
            <DropdownListItem onClick={() => {}}>Download</DropdownListItem>
            <DropdownListItem onClick={() => {}}>Remove</DropdownListItem>
          </DropdownList>
        }
        icon={Clock}
        badge={<Badge variant="positive">Tag</Badge>}
        title="Forma 36"
      >
        <Typography>
          <Paragraph>
            Forma 36 is an open-source design system by Contentful created with
            the intent to reduce the overhead of creating UI by providing tools
            and guidance for digital teams building and extending Contentful
            products.
          </Paragraph>
        </Typography>
      </Card>
    </>
  );
};
