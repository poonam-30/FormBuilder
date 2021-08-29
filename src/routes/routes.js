import CreateForm from '../components/form/createForm';
import Forms from '../components/form/forms';
import Form from '../components/form/form';

const routes = [
    {
        path:"/",
        Component:Forms
    },
    {
        path:"/createForm",
        Component:CreateForm
    },
    {
        path:"/:formURL",
        Component:Form
    }
];

export default routes;