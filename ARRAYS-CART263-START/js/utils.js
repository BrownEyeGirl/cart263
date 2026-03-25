function add_elements_to_dom(arrayDef, parent) {
  for (let i = 0; i < arrayDef.length; i++) {
    let el = document.createElement("div");
    el.classList.add(arrayDef[i].shapeClass);
    el.classList.add(arrayDef[i].customShapeClass);
    parent.appendChild(el);
    el.style.background = `rgb(${arrayDef[i].color.r},${arrayDef[i].color.g},${arrayDef[i].color.b})`;
    el.style.left = `${arrayDef[i].x}px`;
    el.style.top = `${arrayDef[i].y}px`;
  }
}

   function add_single_element_to_dom(shapeDef, parent) {
        let el = document.createElement("div");
        el.classList.add(shapeDef.shapeClass);
        el.classList.add(shapeDef.customShapeClass);
        parent.appendChild(el);
        el.style.background = `rgb(${shapeDef.color.r},${shapeDef.color.g},${shapeDef.color.b})`;
        el.style.left = `${shapeDef.x}px`;
        el.style.top = `${shapeDef.y+100}px`;
}
