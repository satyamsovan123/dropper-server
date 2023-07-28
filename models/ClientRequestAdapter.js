class ClientRequestAdapter {
  constructor(requestData) {
    this.name = requestData.name;
    this.deviceIdentity = requestData.deviceIdentity;
    this.timeStamp = requestData.timeStamp;
    this.passphrase = requestData.passphrase;
  }

  get name() {
    return this.name;
  }
}
