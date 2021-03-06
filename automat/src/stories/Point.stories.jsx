import Point from './Point';

export default {
    /* ๐ The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
     */
    title: 'Vrchol',
    component: Point
};

//๐ We create a โtemplateโ of how args map to rendering
const Template = (args) => <Point {...args} />;

//๐ Each story then reuses that template
export const Obecny = Template.bind({});

Obecny.args={
    x:200,
    y:100,
    label:'commonState',
    state:'q1'
};

export const Pocatecni = Template.bind({});
Pocatecni.args={
    x:200,
    y:100,
    label:"initialState",
    state:"q0"
};

export const Koncovy = Template.bind({});
Koncovy.args={
    x:200,
    y:100,
    label:"finalState",
    state: "q2"
};