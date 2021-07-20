/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import { Home } from "../containers/Home";

describe("<Home />", () => {
    test("renders Home Component", () => {
        render(<Home />);
    })
});



