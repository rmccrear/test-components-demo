import { expect } from "vitest";
import { render, screen } from "@testing-library/react";

import HelloWorld from "./HelloWorld";

describe("Hello World Component", () => {
    it("should render Hello World!", async () => {
        render(<HelloWorld />)
        const helloHeading = screen.getByText("Hello World!")
        expect(helloHeading).toBeInTheDocument();
    })
})