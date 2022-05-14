import * as mainActions from "../mainAction";

describe("mainActions", function() {
    it("should return correct type", function() {
        expect(mainActions.connectSuccess()).toEqual({
            type: "CONNECTION_SUCCESS"
        });

        expect(mainActions.setLoading(true)).toEqual({
            payload: true,
            type: "SET_LOADING"
        });
    });
});
