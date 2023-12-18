import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from "./AddItemForm";


const meta: Meta<typeof AddItemForm> = {
    title: 'Todolists/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        callback: {
            description: 'Clicked Button inside form',
            action: 'clicked'
        }
    },
}

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {};