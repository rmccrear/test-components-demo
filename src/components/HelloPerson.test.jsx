import { render, screen } from "@testing-library/react";

import { HelloPerson } from "./HelloPerson";

describe("Hello Person Component", () => {
    it("should say hi to Bob", () => {
        render(<HelloPerson firstName="Bob" />)
        const helloComponent = screen.getByText(/Hello, Bob!/)
        expect(helloComponent).toBeInTheDocument()
    })

    it("should say hi to Alice", () => {
        render(<HelloPerson firstName="Alice" />)
        const helloComponent = screen.getByText(/Hello, Alice!/)
        expect(helloComponent).toBeInTheDocument()
    })
})
