"use strict";

module.exports = {
  name: "helper",

  actions: {
    random() {
      return Math.round(Math.random() * 10);
    }
  },

  events: {
    "hello_called" (payload) {
      this.logger.info("Helper service caugth an event");
      this.logger.info(payload);
    }
  }
}
