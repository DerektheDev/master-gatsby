import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
import { func } from 'prop-types';

function createPatchFrom({ target: { value } }) {
  PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

export default function PriceInput({
  type: { title, description, name },
  value,
  inputComponent,
}) {
  return (
    <div>
      <h2>
        {title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{description}</p>
      <input
        ref={inputComponent}
        type={name}
        defaultValue={value}
        onChange={createPatchFrom}
      />
    </div>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};
