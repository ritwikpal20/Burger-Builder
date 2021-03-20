import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/",
};

describe("Auth Reducer", () => {
    it("should return initial state when passing invalid actionType", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it("should store token upon login", () => {
        expect(
            reducer(initialState, {
                type: actionTypes.AUTH_SUCCESS,
                idToken: "someToken",
                userId: "someUserId",
            })
        ).toEqual({
            token: "someToken",
            userId: "someUserId",
            error: null,
            loading: false,
            authRedirectPath: "/",
        });
    });
});
