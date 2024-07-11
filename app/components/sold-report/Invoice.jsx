// Invoice.js
import React from "react";

const Invoice = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <h1>Invoice</h1>
    <p>This is your invoice.</p>
    {/* Add your invoice content here */}
  </div>
));

export default Invoice;
