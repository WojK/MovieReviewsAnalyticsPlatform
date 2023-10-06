import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

export default {
  title: 'Atom/Title',
  component: Title,
} as Meta<typeof Title>;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {},
};