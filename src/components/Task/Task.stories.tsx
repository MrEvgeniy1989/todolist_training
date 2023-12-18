import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {ReduxStoreProviderDecorator} from "../../decorators/ReduxStoreProviderDecorator";
import {AppRootStateType} from "../../store/store";
import {TaskType} from "../../store/tasksReducer";


const meta: Meta<typeof Task> = {
    title: 'Todolists/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        todolistId: '12321a',
        task: {taskId: '111', taskTitle: 'React', isDone: true}
    },
    decorators: [ReduxStoreProviderDecorator]
}

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {taskId: '222', taskTitle: 'React', isDone: false}
    },
};

const TaskWork = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    if (!task) {
        task = {taskId: '111', taskTitle: 'HardCode', isDone: false}
    }
    return (
        <Task todolistId={'todolistId1'} task={task}/>
    )
}

export const TaskWorkStory: Story = {
    render: () => <TaskWork/>
}