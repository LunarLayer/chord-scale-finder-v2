import { useEffect, useState } from "react";

function CollapsibleText({ title, children }) {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (collapsed) {
      // set max height back to 0
    } else {
      // set max height
    }
  });

  return (
    <div className="collapsibleText">
      <button onClick={() => setCollapsed(!collapsed)}>{title}</button>
      <div className="content">{children}</div>
    </div>
  );
}

export default CollapsibleText;
