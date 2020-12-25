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
  let oldElement = oldChild;
  let newElement = newChild;

  if (oldChild instanceof Abstract) {
    oldElement = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newElement = newChild.getElement();
  }

  const parent = oldElement.parentElement;

  if (parent === null || newElement === null) {
    throw new Error(`Can't replace nonexistent elements`);
  }

  parent.replaceChild(newElement, oldElement);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
