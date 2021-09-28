class Ship {
  constructor(status, warp, type, status_report) {
    this.status = status;
    this.warp = warp;
    this.type = type;
    this.status_report = status_report;
  }

  showStatus() {
    if (status === "active" && warp <= 4) {
      this.status_report +=
        "the engines are active and we could be going faster.";
    } else if (status === "active" && warp > 4) {
      this.status_report +=
        "the engines are active and we are going " + warp + ".";
    } else if (status === "down") {
      this.status_report += "the engines are down.";
    } else {
      this.status_report +=
        "the comms are down and we can`t reach engineering.";
    }
    return `${this.status_report}`;
  }
}

let status = "active";
let warp = 2;
let type = "Dilithium Crystal";
let status_report = "Captain, ";

const ship = new Ship(status, warp, type, status_report);
ship.showStatus();

console.log(ship.showStatus());
