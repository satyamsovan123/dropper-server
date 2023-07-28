const formConstants = require("../../constants/formConstants");
const serverConstants = require("../../constants/serverConstants");

class RequestSerializer {
  name = "";
  deviceIdentity = "";
  passphrase = "";
  timeStamp = Date.now();
  autoDelete = false;
  autoDelete = false;

  constructor(
    name = "",
    deviceIdentity = "",
    passphrase = "",
    timeStamp = Date.now(),
    autoDelete = false
  ) {
    this.name = name;
    this.deviceIdentity = deviceIdentity;
    this.passphrase = passphrase;
    this.timeStamp = timeStamp;
    this.autoDelete = autoDelete;
  }

  build() {
    let request = {
      name: this.name,
      deviceIdentity: this.deviceIdentity,
      passphrase: this.passphrase,
      timeStamp: this.timeStamp,
      autoDelete: this.autoDelete,
    };
    return request;
  }

  validate() {
    let validationResult = {
      isValid: true,
      message: "",
    };

    if (this.name.length === 0) {
      validationResult.isValid = false;
      validationResult.message = `${formConstants.INVALID_NAME}`;
    }
    if (this.deviceIdentity.length === 0) {
      validationResult.isValid = false;
      validationResult.message = `${formConstants.INVALID_DEVICE_IDENTITY}`;
    }
    if (this.timeStamp.length === 0) {
      validationResult.isValid = false;
      validationResult.message = `${formConstants.INVALID_TIMESTAMP}`;
    }
    if (this.passphrase !== "" && this.passphrase.length <= 4) {
      validationResult.isValid = false;
      validationResult.message = `${formConstants.INVALID_PASSPHRASE}`;
    }
    if (typeof this.autoDelete !== "boolean") {
      validationResult.isValid = false;
      validationResult.message = `${formConstants.INVALID_AUTO_DELETE}`;
    }

    return validationResult;
  }
}

module.exports = { RequestSerializer };
