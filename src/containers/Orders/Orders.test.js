import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Spinner from "../../components/UI/Spinner/Spinner";

import { Orders } from "./Orders";
configure({ adapter: new Adapter() });

describe("<Orders />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Orders orders={[]} onFetchOrders={() => {}} />);
    });
    it("should render Spinner while fetching orders", () => {
        wrapper.setProps({ loading: true });
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
});
