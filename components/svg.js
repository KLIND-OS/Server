class KLSVG extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["src", "fill", "stroke", "width", "height"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src") {
      this.loadSvg(newValue);
    } else {
      this.updateSvgAttribute(name, newValue);
    }
  }

  connectedCallback() {
    const src = this.getAttribute("src");
    if (src) {
      this.loadSvg(src);
    }
  }

  async loadSvg(src) {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to load SVG: ${response.statusText}`);
      }
      const svgText = await response.text();
      this.injectSvg(svgText);
    } catch (error) {
      console.error(error);
    }
  }

  injectSvg(svgText) {
    // Clear previous SVG if any
    this.shadowRoot.innerHTML = "";

    // Parse the SVG text into a DOM element
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = doc.documentElement;

    // Set attributes from the custom element to the SVG
    this.updateSvgAttributes(svgElement);

    // Inject the SVG into the shadow DOM
    this.shadowRoot.appendChild(svgElement);
  }

  updateSvgAttributes(svgElement) {
    const attributes = ["fill", "stroke", "width", "height"];
    attributes.forEach((attr) => {
      const value =
        this.getAttribute(attr) ||
        (attr == "fill" ? "currentColor" : undefined);
      if (value) {
        svgElement.setAttribute(attr, value);
      }
    });
  }

  updateSvgAttribute(name, value) {
    const svgElement = this.shadowRoot.querySelector("svg");
    if (svgElement) {
      svgElement.setAttribute(name, value);
    }
  }
}

// Define the custom element
customElements.define("kl-svg", KLSVG);
