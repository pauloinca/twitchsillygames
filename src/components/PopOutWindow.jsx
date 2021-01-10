import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import style from "./Home.module.css";

function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
    try {
      if (styleSheet.cssRules) {
        const newStyleEl = sourceDoc.createElement("style");

        Array.from(styleSheet.cssRules).forEach((cssRule) => {
          newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
        });

        targetDoc.head.appendChild(newStyleEl);
      } else {
        const newLinkEl = sourceDoc.createElement("link");

        newLinkEl.rel = "stylesheet";
        newLinkEl.href = styleSheet.href;
        targetDoc.head.appendChild(newLinkEl);
      }
    } catch (e) {
      // console.log(e);
    }
  });
}
const PopOutWindow = (props) => {
  const [containerEl] = useState(document.createElement("div"));
  let externalWindow = null;

  useEffect(
    () => {
      externalWindow = window.open("", "", `width=500,height=600,left=200,top=200`);
      // copyStyles(Home, externalWindow.document);
      copyStyles(document, externalWindow.document);
      // this part got css working in chrome and firefox
      // containerEl.className = "class1 class2";

      externalWindow.document.body.appendChild(containerEl);
      externalWindow.addEventListener("beforeunload", () => {
        props.closePopupWindowWithHooks();
      });
      console.log("Created Popup Window");
      return function cleanup() {
        console.log("Cleaned up Popup Window");
        externalWindow.close();
        externalWindow = null;
      };
    },
    // Only re-renders this component if the variable changes
    []
  );
  return ReactDOM.createPortal(props.children, containerEl);
};

export default PopOutWindow;
