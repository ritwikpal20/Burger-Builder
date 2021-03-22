import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

import { Checkout } from "./Checkout";

configure({ adapter: new Adapter() });

const ingredients = {
    salad: 1,
    meat: 0,
    bacon: 0,
    cheese: 0,
};

describe("<Checkout />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Checkout />);
    });
    it("should render Checkout summary if received atleast one ingredient", () => {
        wrapper.setProps({ ings: ingredients, match: { url: "" } });
        expect(wrapper.find(CheckoutSummary)).toHaveLength(1);
    });
});
