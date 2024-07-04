class DoNotDisturb {
  static running = false;
  static click(el) {
    DoNotDisturb.running = el.checked;
  }
}
