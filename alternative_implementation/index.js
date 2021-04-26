class Monitor {
  constructor() {
    // setup storage from remotely connected machines/hosts
    // give them slots on page, share the screen of server.
    // Kinda leetcode but WebRTC-ified ?
    this.examples = document.querySelector('[class^=example]');
  }

  clear() {
    console.clear();
  }

  run(e) {
    // todo
  }
}

const z = new Monitor();
