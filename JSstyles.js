class JSSElement {
  selector;
  styles;
  children;
  constructor(selector = "", styles = new JSSStyles(), children = []) {
    this.selector = selector;
    this.styles = styles;
    this.children = children;
  }
}

class JSSStyle {
  type;
  value;
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class JSSStyles {
  styles = [];
  constructor(list = []) {
    this.styles = list;
  }
  toString() {
    let data = "";
    for (const style of this.styles) {
      data += `${style.type}: ${style.value};`;
    }
    return data;
  }
}

// Simple compiler that I wrote. I know it is shit.
class JSSCompiler {
  static compile(jssElement) {
    if (jssElement.selector.length == 0) {
      if (jssElement.styles.styles.length !== 0) {
        throw new Error("Empty JSS element cannot have any styles.");
      }
      let data = "";
      for (let child of jssElement.children) {
        data += this.compile(child);
      }
      return data;
    }
    let data = "";
    data += `${jssElement.selector} {`;
    data += "";
    data += `${jssElement.styles.toString()}`;
    data += "} ";

    for (let child of jssElement.children) {
      // Why tf there is not other way to clone class.
      const clone = Object.assign(
        Object.create(Object.getPrototypeOf(child)),
        child,
      );
      clone.selector = `${jssElement.selector} ${clone.selector}`;
      data += this.compile(clone);
    }

    return data;
  }
  static add(css) {
    const head = document.querySelector("head");
    const style = document.createElement("style");
    style.innerHTML = css;
    head.appendChild(style);
  }
}
