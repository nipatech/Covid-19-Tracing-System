/* eslint-disable no-plusplus */
import React from "react";
import { render, fireEvent } from '@testing-library/react'

import Component from '../screens/home/components/counter';

const random = Math.random(100);
let props;

beforeEach(() => {
  props = {
    counter: random,
    onClickAdd: () => null,
    onClickMinus: () => null
  };
});

describe('Counter Component', () => {

  test("Should render correctly", () => {
    const { container } = render(<Component {...props} />)    
    expect(container.firstChild).toMatchSnapshot();
  })

  test("Expect Correct counter value", () => {
    const { getByTestId } = render(<Component {...props} />)  
    const count = getByTestId("counter").textContent
    expect(parseFloat(count)).toBe(random);
  })

  test("Expect Correct Button add text", () => {
    const { getByTestId } = render(<Component {...props} />)  
    expect(getByTestId('add').textContent).toBe("Add");
  })

  test("Expect Correct Button minus text", () => {
    const { getByTestId } = render(<Component {...props} />)
    expect(getByTestId('minus').textContent).toBe("Minus");
  });

  test('should add 1 after firing add event', async () => {
    const { getByTestId } = render(<Component {...props} />)  
    const addBtn = getByTestId('add');
    fireEvent.click(addBtn)
    const count = getByTestId('counter').textContent;
    let added = parseFloat(random);

    expect(parseFloat(count)).toBe(added++);

  })

  test('should substract 1 after firing minus event', async () => {
    const { getByTestId } = render(<Component {...props} />)  
    const minusBtn = getByTestId('minus');
    fireEvent.click(minusBtn)
    const count = getByTestId('counter').textContent;
    let substract = parseFloat(random);

    expect(parseFloat(count)).toBe(substract--);

  })

})
