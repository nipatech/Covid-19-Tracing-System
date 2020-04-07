import React from "react";
import { render } from '@testing-library/react'

import Component from '../Application';

describe('App', () => {

  test("Renders correctly", () => {
    const { container } = render(<Component />)

    expect(container.firstChild).toMatchSnapshot();
  })

})