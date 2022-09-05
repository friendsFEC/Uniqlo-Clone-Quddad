// currentstyle.skus > each key is sku id and each sku is an object
// goes xs s m l xl xxl
// 65632 has out of stuck > sku key will say 'null'
import _, { map } from 'underscore';
import React from 'react';

export default function SizeAndQuantity({style}) {
  // quantity is - if no size selected 1 if size selected
  if (style.skus.null) {
    return null;
  }
  return (
    <div>
      <select>
        trying
      </select>
    </div>
  );
}
