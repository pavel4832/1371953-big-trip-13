import Abstract from "../view/abstract-view.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `afterend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, child, place) => {
  let containerElement = container;
  let childElement = child;

  if (container instanceof Abstract) {
    containerElement = container.getElement();
  }

  if (child instanceof Abstract) {
    childElement = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      containerElement.prepend(childElement);
      break;
    case RenderPosition.BEFOREEND:
      containerElement.append(childElement);
      break;
    case RenderPosition.AFTER:
      containerElement.after(childElement);
      break;
  }
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || newChild === null) {
    throw new Error(`Can't replace nonexistent elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
